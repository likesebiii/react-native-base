import React from 'react';
import { Platform, Text } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import {
  TOPIC_CONTENT,
  TopicCardContentType,
  TopicContentDifficultyType,
  TopicContentKeyType,
  getAvailableTopicsAtTheEnd,
  getQuestionType,
} from 'utils/content';
import TopicContentCard from '../topic-content-card/TopicContentCard';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  COLLECTED_CARDS_FIRST_SESSION_RATE,
  COLLECTED_CARDS_RATE,
  MAX_TEXT_SIZE_MULTIPLIER,
  hexColorToRgba,
  randomValue,
} from '@utils';
import TopicQuestionCard from '../topic-question-card/TopicQuestionCard';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import { CardBackBlueSvg, CardBackSvg } from 'svgs/cards';
import {
  NUMBER_OF_CARDS,
  THRESHOLD_Y,
} from 'pages/topic-page/context/TopicProvider';
import TopicCardAnswers from '../topic-card-answers/TopicCardAnswers';
import { getCardHeight } from 'pages/topic-page/constants';
import LinearGradient from 'react-native-linear-gradient';
import { useTopicCardGestures } from './hooks/useTopicCardGestures';
import TopicLastCard from '../topic-last-card/TopicLastCard';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { Analytics, Rate, Redux, Vortex } from '@services';
import { useTopicRetry } from './hooks/useTopicRetry';
import { FEED_BOTTOM_BAR_CONTROLLER } from 'pages/feed-page/components/feed-bottom-bar/FeedBottomBar';
import TopicAchievementCard from '../topic-achievement-card/TopicAchievementCard';
import TopicFeedLastCard from '../topic-feed-last-card/TopicFeedLastCard';
import TopicCardLinearGradientBottom from './components/topic-card-linear-gradient-bottom/TopicCardLinearGradientBottom';

type TopicCardProps = {
  count: number;
  instantAnswersOpacity?: boolean;
  bottomInset?: number;
  onAnswer?: (correct: boolean, answer: string) => void;
  onAnswerCallback?: (
    correct: boolean,
    answer: string,
    questionId: number,
  ) => void;
  onSwipe?: () => void;
  disableAnswers?: boolean;
  disableGestures?: boolean;
  disableHorizontalGestures?: boolean;
  disableUpGesture?: boolean;
  type?: TopicContentKeyType;
  topic?: string;
  content: (TopicCardContentType & {
    difficulty?: TopicContentDifficultyType;
    topic?: string;
  } & {
    state?: 'correct' | 'wrong';
    unlocked?: boolean;
    cardsCount?: number;
    cardsCollected?: number;
  })[];
  fullContent?: TopicCardContentType[];
  disableLivesBlocking?: boolean;
  cardHeight?: number;
  cardBackType?: 'normal' | 'blue';
  onTapStart?: () => void;
  retry?: boolean;
} & (
  | {
      enableVerticalSwipe?: false;
      onSwipeUp?: undefined;
      onSwipeDown?: undefined;
    }
  | {
      enableVerticalSwipe?: true;
      onSwipeUp?: () => void;
      onSwipeDown?: (
        type: TopicContentKeyType | undefined,
        difficulty: TopicContentDifficultyType,
        content: TopicCardContentType,
      ) => void;
    }
);

const TopicCard: React.FC<TopicCardProps> = ({
  type,
  instantAnswersOpacity,
  count,
  bottomInset,
  enableVerticalSwipe = false,
  topic: topicFromProps,
  onSwipeUp,
  onSwipeDown,
  onSwipe,
  onAnswer,
  onAnswerCallback,
  disableAnswers,
  disableGestures,
  disableHorizontalGestures,
  disableUpGesture,
  content,
  fullContent = [],
  disableLivesBlocking = false,
  cardHeight: cardHeightFromProps,
  cardBackType = 'normal',
  onTapStart,
  retry = false,
}) => {
  const { screenHeight, screenWidth, styles } = useBaseAspect(aspectStyle);

  const {
    cardZIndex,
    contentIndex,
    focusedCardType,
    difficulty: difficultyFromContext,
    simulateGestureRef,
  } = useTopicContext();

  const cardHeight = cardHeightFromProps ?? getCardHeight(screenHeight);

  const [index, setIndex] = React.useState(contentIndex.value + count);

  const sharedIndex = useSharedValue(contentIndex.value + count);

  const element = { ...content[index] };

  const difficulty = content[index]?.difficulty ?? difficultyFromContext;
  const topic = topicFromProps ?? content[index]?.topic;

  const [lastQuestionAnswerable, setLastQuestionAnswerable] =
    React.useState(false);
  const isLastQuestionAnswerable =
    element?.type === 'question' &&
    (element?.id === -3 || element?.id === -4) &&
    lastQuestionAnswerable;
  const isEmptyQuestion = element?.type === 'question' && element?.id === -1;

  const elementType = getQuestionType(element?.id ?? -1);

  const CardBack = cardBackType == 'blue' ? CardBackBlueSvg : CardBackSvg;

  const tapEnabled = React.useRef(true);

  const { actionOnIncrement, setRetryState, retryState, retryStateValue } =
    useTopicRetry({ retry });

  const changeIndex = () => {
    if (actionOnIncrement.current === 'ignore') {
      // Avoid doing something here
      // as it will be handled later
      tapEnabled.current = true;
    } else {
      const index = { new: contentIndex.value + count };

      if (count === 0) {
        index.new = contentIndex.value + NUMBER_OF_CARDS;
        contentIndex.value = contentIndex.value + NUMBER_OF_CARDS;
      }

      setIndex(index.new);
      sharedIndex.value = index.new;
      tapEnabled.current = true;

      if (actionOnIncrement.current === 'change-retry') {
        setRetryState('initial');
      }

      actionOnIncrement.current = undefined;
    }
  };

  const onTapStartCallback = () => {
    if (tapEnabled.current) {
      tapEnabled.current = false;
      onTapStart?.();
    }
  };

  const onAnswerQuestion = (correct: boolean, answer: number) => {
    if (retryState === 'retried') {
      actionOnIncrement.current = 'change-retry';
      Analytics.log(
        'answerQuestion',
        { topic, difficulty, question: 'retry-question', correct },
        ['amplitude'],
      );
    } else if (
      element?.type === 'question' &&
      (element?.id === -3 || element?.id === -4)
    ) {
      const contentIndex = TOPIC_CONTENT.findIndex(
        (content) => content.key === (type ?? 'world-wonders'),
      );
      const availableTopics = getAvailableTopicsAtTheEnd({
        index: contentIndex,
      });
      const index = contentIndex + answer + 1;

      setTimeout(() => {
        const difficulty = ([1, 2, 3] as TopicContentDifficultyType[])[
          Math.floor(randomValue(0, 3))
        ];
        const type = TOPIC_CONTENT[index % TOPIC_CONTENT.length].key;
        const navigate =
          element.id === -4
            ? NAVIGATION_CONTROLLER.navigate
            : NAVIGATION_CONTROLLER.replace;

        navigate('fk.TopicPage', {
          difficulty: availableTopics[answer].difficulty,
          type: availableTopics[answer].topic,
          lastCardEnabled: true,
        });
        Analytics.log(
          'tapElement',
          {
            location: 'topic-card',
            element: 'continue-with-another-topic',
            type,
            difficulty: difficulty.toString(),
          },
          ['amplitude'],
        );
      }, 1500);
    } else if (onAnswer) {
      onAnswer?.(
        correct,
        element.type === 'question' ? element.answers[answer] : '',
      );
    } else {
      // Continue logging the event
      Analytics.log(
        'answerQuestion',
        { topic, difficulty, question: element.title, correct },
        ['amplitude'],
      );
      // Try to increment user streak
      Vortex.dispatch('user-vortex', 'incrementUserStreak')();
      if (correct) {
        Vortex.dispatch('user-vortex', 'addCollectedQuestion')(element.id);
      } else {
        Vortex.dispatch('user-vortex', 'removeUserLives')(1);
      }

      // Rate use logic
      const vortexObject = Vortex.getObject('user-vortex');

      if (
        vortexObject.rateSuccess !== true &&
        vortexObject.rateThisSession !== true
      ) {
        const cardsRate =
          Redux.getState().current.user?.sessions === 1
            ? COLLECTED_CARDS_FIRST_SESSION_RATE
            : COLLECTED_CARDS_RATE;

        if (vortexObject.collectedQuestions.length % cardsRate === 0) {
          // Change rate this session
          Vortex.dispatch('user-vortex', 'changeRateThisSession')(true);
          Rate.rate(true, (success) => {
            if (success) {
              Vortex.dispatch('user-vortex', 'changeRate')(true);
            }
          });
        }
      }

      // Call the onAnswerCallback
      // This is not mandatory
      onAnswerCallback?.(
        correct,
        element.type === 'question' ? element.answers[answer] : '',
        element.id,
      );

      // Check for retry question
      // in case retry is activated
      // and the state is initial
      // go to retried
      if (retryState === 'initial' && correct === false) {
        setTimeout(() => {
          FEED_BOTTOM_BAR_CONTROLLER.questionAnimate?.('animate');
          setRetryState('retried');
          actionOnIncrement.current = 'ignore';
        }, 1500);
      }
    }
  };

  const onSwipeUpCallback = () => {
    if (retryState === 'retried') {
      actionOnIncrement.current = 'change-retry';
    }

    Analytics.log(
      'cardSwap',
      {
        topic,
        difficulty,
        question: retryState === 'retried' ? 'retry-question' : element.title,
        direction: 'up',
      },
      ['amplitude'],
    );
    onSwipeUp?.();
  };

  const onSwipeDownCallback = () => {
    if (retryState === 'retried') {
      actionOnIncrement.current = 'change-retry';
    }

    if (isLastQuestionAnswerable) {
      NAVIGATION_CONTROLLER.replace('fk.TopicPage', {
        type,
        lastCardEnabled: true,
      });
    } else {
      Analytics.log(
        'cardSwap',
        {
          topic,
          difficulty,
          question: retryState === 'retried' ? 'retry-question' : element.title,
          direction: 'down',
        },
        ['amplitude'],
      );
      onSwipeDown?.(elementType, difficulty, element);
    }
  };

  const {
    gesture,
    opacity,
    translateX,
    translateY,
    animatedInitialTranslateX,
    animatedTranslateY,
    zIndex,
    cardDirection,
    cardDirectionAnimated,
    backCoverEnabled,
    enableVertical,
    simulateGesture,
  } = useTopicCardGestures({
    count,
    content,
    screenHeight,
    index,
    answer: (element as any)?.answer,
    sharedIndex,
    onAnswerQuestion,
    changeIndex,
    enableVerticalSwipe,
    onSwipe,
    onSwipeUp: onSwipeUpCallback,
    onSwipeDown: onSwipeDownCallback,
    bottomInset,
    isEmptyQuestion,
    disableGestures,
    disableHorizontalGestures,
    disableUpGesture,
    isLastQuestionAnswerable,
    disableLivesBlocking,
    onTapStart: onTapStartCallback,
    retryStateValue,
  });

  const translate = useDerivedValue(() => {
    return animatedInitialTranslateX.value + translateX.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex: zIndex.value,
      transform: [
        { translateX: translate.value },
        {
          translateY:
            interpolate(
              translate.value,
              [-screenWidth / 2, 0, screenWidth / 2],
              [
                100 * cardDirectionAnimated.value,
                0,
                100 * cardDirectionAnimated.value,
              ],
              Extrapolation.CLAMP,
            ) +
            animatedTranslateY.value +
            translateY.value,
        },
        {
          rotate: `${interpolate(
            translate.value,
            [-screenWidth / 2, 0, screenWidth / 2],
            [
              50 * cardDirectionAnimated.value,
              0,
              -50 * cardDirectionAnimated.value,
            ],
            Extrapolation.CLAMP,
          )}deg`,
        },
        {
          rotateZ: `${interpolate(
            translate.value,
            [-screenWidth / 2, 0, screenWidth / 2],
            [
              -20 * cardDirectionAnimated.value,
              0,
              20 * cardDirectionAnimated.value,
            ],
            Extrapolation.CLAMP,
          )}deg`,
        },
      ],
    };
  });

  const changeSimulateReference = () => {
    setTimeout(() => {
      simulateGestureRef.current = simulateGesture;
    });
  };

  useDerivedValue(() => {
    if (cardZIndex.value + NUMBER_OF_CARDS - 1 === zIndex.value) {
      // Disable back cover
      if (backCoverEnabled.value === 1.0) {
        runOnJS(changeSimulateReference)();

        if (!isEmptyQuestion) {
          backCoverEnabled.value = withTiming(0, {});
        }
        focusedCardType.value = element?.type ?? 'content';
      }
    }
  });

  const setAnswerable = () => {
    setLastQuestionAnswerable(true);
    changeSimulateReference();
  };

  const backCoverAnimatedStyle = useAnimatedStyle(() => {
    return {
      zIndex:
        backCoverEnabled.value !== 0
          ? Platform.OS === 'ios'
            ? 1
            : withTiming(1)
          : Platform.OS === 'ios'
          ? -1
          : withTiming(-1),
      opacity: backCoverEnabled.value,
    };
  });

  const questionBackCoverAnimatedStyle = useAnimatedStyle(() => {
    if (element?.type === 'question') {
      return {
        zIndex:
          backCoverEnabled.value === 1
            ? Platform.OS === 'ios'
              ? 0
              : withTiming(0)
            : Platform.OS === 'ios'
            ? 1
            : withTiming(1),
        opacity: withTiming(backCoverEnabled.value, { duration: 150 }),
      };
    } else {
      return {};
    }
  });

  const swipeUpStyle = useAnimatedStyle(() => {
    if (enableVertical.value === 0) {
      return { opacity: withTiming(0) };
    }

    return {
      opacity: interpolate(
        translateY.value + animatedTranslateY.value,
        [-screenHeight / 4, -THRESHOLD_Y, 0],
        [0.7, 0.7, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  const swipeDownStyle = useAnimatedStyle(() => {
    if (enableVertical.value === 0) {
      return { opacity: withTiming(0) };
    }

    return {
      opacity: interpolate(
        translateY.value + animatedTranslateY.value,
        [0, THRESHOLD_Y, screenHeight / 4],
        [0, 0.7, 0.7],
        Extrapolation.CLAMP,
      ),
    };
  });

  if (element?.id === undefined) {
    return null;
  }

  return (
    <>
      {element.type === 'question' &&
      !isEmptyQuestion &&
      disableAnswers !== true &&
      retryState !== 'retried' ? (
        <TopicCardAnswers
          instantAnswersOpacity={instantAnswersOpacity}
          answers={element.answers as any}
          answer={element.answer}
          translate={translate}
          cardDirection={cardDirection}
          zIndex={zIndex}
          simulateGesture={simulateGesture}
        />
      ) : null}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {element.type === 'content' ? (
            <TopicContentCard
              title={element.title}
              content={element.content}
              image={(element as any)?.image}
              topic={topic}
            />
          ) : element.type === 'achievement' ? (
            <TopicAchievementCard
              title={element.title}
              content={element.content}
              cardHeight={cardHeight}
              fill={element.color}
              image={element.image}
              state={element.state}
              unlocked={element.unlocked}
              cardsCollected={element.cardsCollected}
              cardsCount={element.cardsCount}
            />
          ) : (
            <>
              {element.id === -3 ? (
                <TopicLastCard
                  topic={topic}
                  fullContent={fullContent}
                  zIndex={zIndex}
                  setAnswerable={setAnswerable}
                  type={type}
                />
              ) : element.id === -4 ? (
                <TopicFeedLastCard topic={topic} />
              ) : (
                <TopicQuestionCard
                  title={element.title}
                  contentHeight={cardHeight}
                  topic={topic}
                  cardBackType={cardBackType}
                  backgroundColor={
                    cardBackType === 'blue' ? '#84A8C2' : undefined
                  }
                  retryState={retryState}
                  difficulty={difficulty}
                />
              )}
            </>
          )}
          {enableVerticalSwipe || isLastQuestionAnswerable ? (
            <Animated.View style={[styles.cardBack, swipeUpStyle]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.8 }}
                locations={[0, 1]}
                colors={[hexColorToRgba('#297697'), hexColorToRgba('#06232F')]}
                style={[
                  styles.cardContent,
                  styles.center,
                  {
                    height: cardHeight * 1.06,
                    borderRadius: cardHeight * 0.04,
                  },
                ]}>
                <Text
                  style={styles.iDoNotCareText}
                  maxFontSizeMultiplier={
                    MAX_TEXT_SIZE_MULTIPLIER
                  }>{`I DON'T CARE`}</Text>
              </LinearGradient>
            </Animated.View>
          ) : null}
          {enableVerticalSwipe || isLastQuestionAnswerable ? (
            <Animated.View style={[styles.cardBack, swipeDownStyle]}>
              <TopicCardLinearGradientBottom
                element={element}
                cardHeight={cardHeight}
                fullContent={fullContent}
              />
            </Animated.View>
          ) : null}
          <Animated.View style={[styles.cardBack, backCoverAnimatedStyle]}>
            <Animated.View
              style={[
                styles.cardContent,
                {
                  backgroundColor:
                    cardBackType === 'blue' ? '#84A8C2' : '#C2A984',
                },
                { height: cardHeight * 1.06, borderRadius: cardHeight * 0.04 },
              ]}>
              <CardBack
                height={cardHeight * 1.06}
                width={cardHeight * 0.709 * 1.06}
              />
            </Animated.View>
          </Animated.View>
          {element.type === 'question' ? (
            <Animated.View
              style={[styles.cardBack, questionBackCoverAnimatedStyle]}>
              <Animated.View
                style={[
                  styles.questionBackCover,
                  {
                    height: cardHeight * 1.06,
                    borderRadius: cardHeight * 0.04,
                  },
                ]}
              />
            </Animated.View>
          ) : null}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default TopicCard;

import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import TopicQuestionCard from 'pages/topic-page/components/topic-question-card/TopicQuestionCard';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  cancelAnimation,
  interpolate,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  BOTTOM_CONTROLLER_BAR_HEIGHT,
  getFocusCardScale,
  getFocusOrigin,
  getPlaceholderLocation,
  getTablePlaceholderScale,
} from '../../constants';
import { useGameContext } from 'pages/game-page/context/useGameContext';
import GameCardQuestionEnvironment from '../game-card-question-environment/GameCardQuestionEnvironment';
import { TopicQuestionsType } from '@utils';

type GameCardProps = {
  initialHeight: number;
  cardHeight: number;
  question: TopicQuestionsType;
  initialCount: number;
  type: 'me' | 'enemy';
};

const GameCard: React.FC<GameCardProps> = ({
  initialHeight,
  cardHeight,
  question,
  initialCount,
  type,
}) => {
  const { styles, screenHeight, screenWidth } = useBaseAspect(aspectStyle);

  const {
    activeCardTranslateY,
    activeCardTranslateX,
    activeRegion,
    handDeck,
    handDeckLimitCard,
    placeCardInPlaceholder,
    focusCount,
    focusTimeout,
    onAnswerQuestion: onQuestionAnswer,
    disableInteractions,
    enemyCards,
  } = useGameContext();

  const focusScale = getFocusCardScale(screenHeight, cardHeight);
  const focusPosition = getFocusOrigin(screenHeight);

  const placeholderScale = getTablePlaceholderScale(cardHeight * 1.06);

  const panDisabled = useSharedValue(0);

  const previousKey = useSharedValue(-3);
  const key = useDerivedValue(() => {
    if (initialCount > handDeckLimitCard.value) {
      return -2;
    } else if (handDeck.value.includes(initialCount)) {
      return handDeck.value.findIndex((value) => value === initialCount);
    } else {
      return -1;
    }
  });

  const originTranslateX = useDerivedValue(() => {
    if (key.value === -2) {
      return screenWidth;
    }

    return (
      key.value * cardHeight * 0.75 +
      16 +
      ((5 - handDeck.value.length) * (1.06 * cardHeight * 0.71)) / 2
    );
  });

  const originTranslateY = useDerivedValue(() => {
    if (key.value === -2) {
      if (type === 'me') {
        return screenHeight + cardHeight + 100;
      } else {
        return -cardHeight - 100;
      }
    }

    return screenHeight - BOTTOM_CONTROLLER_BAR_HEIGHT - cardHeight - 16;
  });

  const startTranslateX = useSharedValue(originTranslateX.value);
  const startTranslateY = useSharedValue(originTranslateY.value);

  const scale = cardHeight / initialHeight;

  const initialTranslateY = useSharedValue(0);
  const initialTranslateX = useSharedValue(0);

  const translateX = useSharedValue(startTranslateX.value);
  const translateY = useSharedValue(startTranslateY.value);

  const onTable = useSharedValue(0);
  const currentTablePlace = useSharedValue(-1);

  const cardOnFocus = useSharedValue(0);
  // 1 means answered and correct
  // 0 means answered and wrong
  const cardAnswered = useSharedValue(-1);

  const onKeyChange = () => {
    'worklet';

    if (previousKey.value === -2 && key.value !== -1) {
      translateX.value = withTiming(originTranslateX.value);
      translateY.value = withTiming(originTranslateY.value);
    }

    previousKey.value = key.value;
  };

  useDerivedValue(() => {
    key.value;

    onKeyChange();
  });

  const changeCardAnswered = () => {
    'worklet';

    if (cardOnFocus.value === 1 && cardAnswered.value === -1) {
      // It means timeout
      cardAnswered.value = 0;
    }
  };

  useDerivedValue(() => {
    if (focusCount.value === initialCount) {
      cardOnFocus.value = 1;
    } else {
      cardOnFocus.value = 0;

      changeCardAnswered();
    }
  });

  const cardNotInDeckAnymore = () => {
    'worklet';

    if (onTable.value === 0) {
      translateX.value = withTiming(originTranslateX.value);
    }
  };

  useDerivedValue(() => {
    originTranslateX.value;

    cardNotInDeckAnymore();
  });

  const changeFocus = () => {
    'worklet';

    if (cardOnFocus.value === 1.0) {
      translateX.value = withTiming(focusPosition.x);
      translateY.value = withTiming(focusPosition.y);
    } else if (translateX.value !== startTranslateX.value) {
      translateX.value = withTiming(startTranslateX.value);
      translateY.value = withTiming(startTranslateY.value);
    }
  };

  useDerivedValue(() => {
    cardOnFocus.value;

    changeFocus();
  });

  const panActive = useSharedValue(0);
  // Check if it can be deleted
  const activeScale = useSharedValue(0);

  const newScale = useDerivedValue(() => {
    const newScale =
      cardOnFocus.value === 1.0
        ? withTiming(focusScale)
        : panActive.value === 0
        ? withTiming(onTable.value ? placeholderScale : 1)
        : panActive.value !== 1.0
        ? interpolate(
            panActive.value,
            [0, 1],
            [
              onTable.value ? placeholderScale : 1,
              interpolate(
                translateY.value,
                [0, originTranslateY.value - 100, originTranslateY.value],
                [1, 2, 1],
                Extrapolation.CLAMP,
              ),
            ],
            Extrapolation.CLAMP,
          )
        : withTiming(2.5);

    return newScale;
  });

  const placeEnemyCard = () => {
    'worklet';

    if (enemyCards.value.includes(initialCount)) {
      const target = { x: originTranslateX.value, y: originTranslateY.value };
      const tablePlace = placeCardInPlaceholder(
        (initialCount % 3) as any,
        currentTablePlace,
        initialCount,
        type,
      );

      if (tablePlace !== -1) {
        const { x, y } = getPlaceholderLocation(tablePlace, type);

        target.x = x;
        target.y = y;

        activeRegion.value = -1;
      }

      // Mark that the card is not in deck anymore
      if (target.y === originTranslateY.value) {
        onTable.value = 0;
      } else {
        onTable.value = 1;
      }

      translateX.value = withTiming(target.x);
      translateY.value = withTiming(target.y);

      panActive.value = 0;

      activeScale.value = interpolate(
        translateY.value,
        [startTranslateY.value, startTranslateY.value - 100],
        [1, 2],
        Extrapolation.CLAMP,
      );
      activeScale.value = withTiming(1, {}, () => {
        startTranslateX.value = target.x;
        startTranslateY.value = target.y;
        activeScale.value = 0;
      });
    }
  };

  // Enemy related logic
  useDerivedValue(() => {
    if (type === 'enemy' && enemyCards.value.length) {
      placeEnemyCard();
    }
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      if (cardAnswered.value !== -1 || type === 'enemy') {
        panActive.value = 1;
        panDisabled.value = 1;

        return;
      } else if (
        cardOnFocus.value !== 0 ||
        cardAnswered.value !== -1 ||
        disableInteractions.value !== 0
      ) {
        panDisabled.value = 1;

        return;
      } else {
        panDisabled.value = 0;
      }

      initialTranslateY.value = translateX.value;
      initialTranslateX.value = translateY.value;

      panActive.value = withTiming(1, { duration: 0 }, () => {
        activeCardTranslateY.value =
          translateY.value + cardHeight / newScale.value / 2 + 16;
        activeCardTranslateX.value =
          translateX.value + cardHeight / newScale.value / 0.695 / 2 + 8;
      });
    })
    .onChange((event) => {
      if (panDisabled.value || cardAnswered.value !== -1) {
        return;
      }

      translateX.value = initialTranslateY.value + event.translationX;
      translateY.value = initialTranslateX.value + event.translationY;

      activeCardTranslateY.value =
        translateY.value + cardHeight / newScale.value / 2 + 16;
      activeCardTranslateX.value =
        translateX.value + cardHeight / newScale.value / 0.695 / 2 + 8;
    })
    .onFinalize(() => {
      if (panDisabled.value || cardAnswered.value !== -1) {
        if (panActive.value === 1) {
          panActive.value = 0;
        }

        return;
      }

      activeCardTranslateY.value = 0;
      activeCardTranslateX.value = 0;

      const target = { x: originTranslateX.value, y: originTranslateY.value };
      const tablePlace = placeCardInPlaceholder(
        activeRegion.value,
        currentTablePlace,
        initialCount,
        type,
      );

      if (tablePlace !== -1) {
        const { x, y } = getPlaceholderLocation(tablePlace, type);

        target.x = x;
        target.y = y;

        activeRegion.value = -1;
      }

      // Mark that the card is not in deck anymore
      if (target.y === originTranslateY.value) {
        onTable.value = 0;
      } else {
        onTable.value = 1;
      }

      translateX.value = withTiming(target.x);
      translateY.value = withTiming(target.y);

      panActive.value = 0;

      activeScale.value = interpolate(
        translateY.value,
        [startTranslateY.value, startTranslateY.value - 100],
        [1, 2],
        Extrapolation.CLAMP,
      );
      activeScale.value = withTiming(1, {}, () => {
        startTranslateX.value = target.x;
        startTranslateY.value = target.y;
        activeScale.value = 0;
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        ...(onTable.value
          ? [
              {
                translateY: (-1.06 * cardHeight * (1 - placeholderScale)) / 2,
              },
              {
                translateX:
                  (-1.06 * cardHeight * (1 - placeholderScale) * 0.71) / 2,
              },
            ]
          : []),
        ...(cardOnFocus.value
          ? [
              {
                translateY:
                  (-cardHeight * (placeholderScale - newScale.value)) / 2,
              },
              {
                translateX:
                  (-cardHeight * (placeholderScale - newScale.value) * 0.71) /
                  2,
              },
            ]
          : []),
        {
          scale: newScale.value,
        },
        {
          translateX: translateX.value / newScale.value,
        },
        {
          translateY: translateY.value / newScale.value,
        },
      ],
    };
  });

  const cardDirection = useSharedValue(0);
  const focusTranslateX = useSharedValue(0);

  const animatedStyle1 = useAnimatedStyle(() => {
    if (cardOnFocus.value === 0) {
      return {
        zIndex: panActive.value !== 0 ? 1 : withDelay(500, withTiming(0)),
        transform: [
          { translateX: withTiming(0) },
          {
            translateY: withTiming(0),
          },
          // {
          //   rotate: `${withTiming(0)}deg`,
          // },
          // {
          //   rotateZ: `${withTiming(0)}deg`,
          // },
        ],
      };
    }

    const translate = focusTranslateX.value;

    return {
      zIndex: 4,
      transform: [
        { translateX: translate },
        {
          translateY: interpolate(
            translate,
            [-screenWidth / 2, 0, screenWidth / 2],
            [100 * cardDirection.value, 0, 100 * cardDirection.value],
            Extrapolation.CLAMP,
          ),
        },
        {
          rotate: `${interpolate(
            translate,
            [-screenWidth / 2, 0, screenWidth / 2],
            [10 * cardDirection.value, 0, -10 * cardDirection.value],
            Extrapolation.CLAMP,
          )}deg`,
        },
        {
          rotateZ: `${interpolate(
            translate,
            [-screenWidth / 2, 0, screenWidth / 2],
            [-20 * cardDirection.value, 0, 20 * cardDirection.value],
            Extrapolation.CLAMP,
          )}deg`,
        },
      ],
    };
  });

  const onAnswerQuestion = (correct: boolean) => {
    cardAnswered.value = correct ? 1 : 0;
    cancelAnimation(focusTimeout);
    runOnUI(onQuestionAnswer)(correct, currentTablePlace.value, type);
  };

  const correctAnswerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardAnswered.value === 1 ? withTiming(0.5) : 0,
    };
  });

  const wrongAnswerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardAnswered.value === 0 ? withTiming(0.5) : 0,
    };
  });

  return (
    <>
      <GameCardQuestionEnvironment
        translateX={focusTranslateX}
        cardOnFocus={cardOnFocus}
        cardDirection={cardDirection}
        question={question}
        onAnswerQuestion={onAnswerQuestion}
        type={type}
        initialCount={initialCount}
      />
      <Animated.View style={[styles.absolute, animatedStyle1]}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              {
                height: cardHeight + cardHeight * 0.06,
                width: cardHeight * 0.695 + cardHeight * 0.06,
              },
              animatedStyle,
            ]}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: '#B3000C',
                  zIndex: 2,
                  borderRadius: cardHeight * 0.04,
                },
                wrongAnswerAnimatedStyle,
              ]}
            />
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: '#238823',
                  zIndex: 2,
                  borderRadius: cardHeight * 0.04,
                },
                correctAnswerAnimatedStyle,
              ]}
            />
            <Animated.View
              style={{
                transform: [
                  { translateY: (-1.06 * (initialHeight - cardHeight)) / 2 },
                  { scale: scale },
                  {
                    translateX:
                      (-1.06 * (initialHeight - cardHeight) * 0.71) / 2,
                  },
                ],
              }}>
              <TopicQuestionCard
                title={question.title}
                contentHeight={initialHeight}
              />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
};

export default GameCard;

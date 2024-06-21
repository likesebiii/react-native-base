import React from 'react';
import { useBaseAspect } from '@hooks';
import { CARD_ANSWERS_MARGIN, aspectStyle } from './aspect';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { BaseText } from 'components/base/base-text/BaseText';
import { CardAnswerSvgIcon } from '@svgs';
import { ACTIVE_OPACITY } from '@utils';
import {
  NUMBER_OF_CARDS,
  THRESHOLD,
} from 'pages/topic-page/context/TopicProvider';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import TopicCardAnswerBackground from '../topic-card/components/topic-card-answer-background/TopicCardAnswerBackground';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Analytics } from '@services';
import { TopicCardGestureType } from '../topic-card/hooks/useTopicCardGestures';

interface TopicCardAnswersProps {
  answers: string[];
  answer: number;
  zIndex: SharedValue<number>;
  translate: SharedValue<number>;
  cardDirection: SharedValue<number>;
  instantAnswersOpacity?: boolean;
  disableHorizontalGestures?: boolean;
  simulateGesture?: (type: TopicCardGestureType) => void;
}

const TopicCardAnswers: React.FC<TopicCardAnswersProps> = ({
  answers,
  answer,
  zIndex,
  translate,
  cardDirection,
  instantAnswersOpacity = true,
  disableHorizontalGestures = false,
  simulateGesture,
}) => {
  const { styles, screenWidth } = useBaseAspect(aspectStyle);

  const { cardZIndex, questionAnswer, questionProgress, pressedCard } =
    useTopicContext();

  const answersStyle = useAnimatedStyle(() => {
    const value =
      cardZIndex.value + NUMBER_OF_CARDS - 1 === zIndex.value ? 1 : 0;

    return {
      opacity: instantAnswersOpacity ? value : withTiming(value),
      zIndex: value ? zIndex.value + 1 : 0,
    };
  }, []);

  const firstAnswerZIndex = useAnimatedStyle(() => {
    const value =
      cardZIndex.value + NUMBER_OF_CARDS - 1 === zIndex.value ? 1 : 0;

    return {
      zIndex: value,
    };
  }, []);

  const firstAnswerStyle = useAnimatedStyle(() => {
    if (
      questionAnswer.value !== 4 &&
      questionAnswer.value !== 0 &&
      pressedCard.value !== 0
    ) {
      return { transform: [{ translateX: withTiming(-screenWidth / 4) }] };
    }

    if (
      (cardDirection.value !== -1.0 || translate.value >= -THRESHOLD) &&
      pressedCard.value !== 0
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      screenWidth / 2 +
      (questionAnswer.value === 0 ? 1 : 0) *
        (screenWidth / 4 - CARD_ANSWERS_MARGIN / 4 - 2) +
      (questionProgress.value < 0.5 ? 0 : 1) * screenWidth;

    return {
      transform: [
        {
          translateX: withTiming(target),
        },
      ],
    };
  });

  const secondAnswerStyle = useAnimatedStyle(() => {
    if (
      questionAnswer.value !== 4 &&
      questionAnswer.value !== 1 &&
      pressedCard.value !== 1
    ) {
      return { transform: [{ translateX: withTiming(-screenWidth / 4) }] };
    }

    if (
      (cardDirection.value !== 1.0 || translate.value >= -THRESHOLD) &&
      pressedCard.value !== 1
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      screenWidth / 2 +
      (questionAnswer.value === 1 ? 1 : 0) *
        (screenWidth / 4 - CARD_ANSWERS_MARGIN / 4 - 2) +
      (questionProgress.value < 0.5 ? 0 : 1) * screenWidth;

    return {
      transform: [
        {
          translateX: withTiming(target),
        },
      ],
    };
  });

  const thirdAnswerStyle = useAnimatedStyle(() => {
    if (
      questionAnswer.value !== 4 &&
      questionAnswer.value !== 2 &&
      pressedCard.value !== 2
    ) {
      return {
        transform: [{ translateX: withTiming(screenWidth / 4) }],
      };
    }

    if (
      (cardDirection.value !== -1.0 || translate.value <= THRESHOLD) &&
      pressedCard.value !== 2
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      -screenWidth / 2 -
      (questionAnswer.value === 2 ? 1 : 0) *
        (screenWidth / 4 - CARD_ANSWERS_MARGIN / 4 - 2) -
      (questionProgress.value < 0.5 ? 0 : 1) * screenWidth;

    return {
      transform: [
        {
          translateX: withTiming(target),
        },
      ],
    };
  });

  const fourthAnswerStyle = useAnimatedStyle(() => {
    if (
      questionAnswer.value !== 4 &&
      questionAnswer.value !== 3 &&
      pressedCard.value !== 3
    ) {
      return { transform: [{ translateX: withTiming(screenWidth / 4) }] };
    }

    if (
      (cardDirection.value !== 1.0 || translate.value <= THRESHOLD) &&
      pressedCard.value !== 3
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      -screenWidth / 2 -
      (questionAnswer.value === 3 ? 1 : 0) *
        (screenWidth / 4 - CARD_ANSWERS_MARGIN / 4 - 2) -
      (questionProgress.value < 0.5 ? 0 : 1) * screenWidth;

    return {
      transform: [
        {
          translateX: withTiming(target),
        },
      ],
    };
  });

  const onCardPress = (index: number) => {
    if (disableHorizontalGestures) {
      return;
    }

    if (pressedCard.value !== index) {
      Analytics.log(
        'tapElement',
        { location: 'topic-card-answers', type: `answer-${index}-first` },
        ['amplitude'],
      );
      pressedCard.value = index;
    } else {
      const type =
        index == 0
          ? 'left-top'
          : index === 1
          ? 'left-bottom'
          : index === 2
          ? 'right-top'
          : index === 3
          ? 'right-bottom'
          : 'right-bottom';

      Analytics.log(
        'tapElement',
        { location: 'topic-card-answers', type: `answer-${type}-second` },
        ['amplitude'],
      );

      simulateGesture?.(type);
    }
  };

  const onFirstCardPress = () => onCardPress(0);
  const onSecondCardPress = () => onCardPress(1);
  const onThirdCardPress = () => onCardPress(2);
  const onFourthCardPress = () => onCardPress(3);

  return (
    <Animated.View
      style={[styles.answersContainer, answersStyle]}
      pointerEvents={'box-none'}>
      <Animated.View style={styles.answersMargin} pointerEvents={'box-none'}>
        <Animated.View
          style={[styles.firstAnswer, firstAnswerStyle, firstAnswerZIndex]}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={styles.touchable}
            onPress={onFirstCardPress}>
            <TopicCardAnswerBackground answer={0} correctAnswer={answer} />
            <Animated.View style={styles.leftAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                numberOfLines={3}>
                {answers[0]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.firstIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.secondAnswer, secondAnswerStyle]}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={styles.touchable}
            onPress={onSecondCardPress}>
            <TopicCardAnswerBackground answer={1} correctAnswer={answer} />
            <Animated.View style={styles.leftAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                numberOfLines={3}>
                {answers[1]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.secondIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.thirdAnswer, thirdAnswerStyle]}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={styles.touchable}
            onPress={onThirdCardPress}>
            <TopicCardAnswerBackground answer={2} correctAnswer={answer} />
            <Animated.View style={styles.rightAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                numberOfLines={3}>
                {answers[2]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.thirdIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.fourthAnswer, fourthAnswerStyle]}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={styles.touchable}
            onPress={onFourthCardPress}>
            <TopicCardAnswerBackground answer={3} correctAnswer={answer} />
            <Animated.View style={styles.rightAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                numberOfLines={3}>
                {answers[3]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.fourthIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default TopicCardAnswers;

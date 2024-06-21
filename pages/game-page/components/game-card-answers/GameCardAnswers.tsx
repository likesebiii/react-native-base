import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { BaseText } from 'components/base/base-text/BaseText';
import { CardAnswerSvgIcon } from '@svgs';
import { THRESHOLD } from 'pages/topic-page/context/TopicProvider';
import GameCardAnswerBackground from '../game-card-answer-background/GameCardAnswerBackground';
import GameCardAnswersTimeout from '../game-card-answers-timeout/GameCardAnswersTimeout';
import GameCardAnswersTitle from '../game-card-answers-title/GameCardAnswersTitle';

interface GameCardAnswersProps {
  answers: string[];
  answer: number;
  translate: SharedValue<number>;
  forceTranslate: SharedValue<number>;
  cardDirection: SharedValue<number>;
  cardOnFocus: SharedValue<number>;
  questionAnswer: SharedValue<number>;
  questionProgress: SharedValue<number>;
  type: 'me' | 'enemy';
}

const GameCardAnswers: React.FC<GameCardAnswersProps> = ({
  answers,
  answer,
  translate,
  forceTranslate,
  cardDirection,
  cardOnFocus,
  questionAnswer,
  questionProgress,
  type,
}) => {
  const { styles, screenWidth } = useBaseAspect(aspectStyle);

  const answersStyle = useAnimatedStyle(() => {
    const value = cardOnFocus.value ? 1 : 0;

    return { opacity: value };
  }, []);

  const firstAnswerStyle = useAnimatedStyle(() => {
    if (questionAnswer.value !== 4 && questionAnswer.value !== 0) {
      return { transform: [{ translateX: withTiming(-screenWidth / 4) }] };
    }

    if (
      cardDirection.value !== -1.0 ||
      (translate.value >= -THRESHOLD && forceTranslate.value >= -THRESHOLD)
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      screenWidth / 2 +
      (questionAnswer.value === 0 ? 1 : 0) * (screenWidth / 4) +
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
    if (questionAnswer.value !== 4 && questionAnswer.value !== 1) {
      return { transform: [{ translateX: withTiming(-screenWidth / 4) }] };
    }

    if (
      cardDirection.value !== 1.0 ||
      (translate.value >= -THRESHOLD && forceTranslate.value >= -THRESHOLD)
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      screenWidth / 2 +
      (questionAnswer.value === 1 ? 1 : 0) * (screenWidth / 4) +
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
    if (questionAnswer.value !== 4 && questionAnswer.value !== 2) {
      return { transform: [{ translateX: withTiming(screenWidth / 4) }] };
    }

    if (
      cardDirection.value !== -1.0 ||
      (translate.value <= THRESHOLD && forceTranslate.value <= THRESHOLD)
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      -screenWidth / 2 -
      (questionAnswer.value === 2 ? 1 : 0) * (screenWidth / 4) -
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
    if (questionAnswer.value !== 4 && questionAnswer.value !== 3) {
      return { transform: [{ translateX: withTiming(screenWidth / 4) }] };
    }

    if (
      cardDirection.value !== 1.0 ||
      (translate.value <= THRESHOLD && forceTranslate.value <= THRESHOLD)
    ) {
      return { transform: [{ translateX: withTiming(0) }] };
    }

    const target =
      -screenWidth / 2 -
      (questionAnswer.value === 3 ? 1 : 0) * (screenWidth / 4) -
      (questionProgress.value < 0.5 ? 0 : 1) * screenWidth;

    return {
      transform: [
        {
          translateX: withTiming(target),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        overflow: 'hidden',
      }}
      pointerEvents={'box-none'}>
      <Animated.View
        style={[styles.answersContainer, answersStyle]}
        pointerEvents={'box-none'}>
        <GameCardAnswersTimeout />
        <GameCardAnswersTitle type={type} />
        <Animated.View style={styles.answersMargin} pointerEvents={'box-none'}>
          <Animated.View
            style={[styles.firstAnswer, firstAnswerStyle]}
            pointerEvents={'box-none'}>
            <GameCardAnswerBackground
              answer={0}
              correctAnswer={answer}
              questionAnswer={questionAnswer}
              questionProgress={questionProgress}
            />
            <Animated.View style={styles.leftAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                numberOfLines={3}
                minimumFontScale={0.9}>
                {answers[0]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.firstIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[styles.secondAnswer, secondAnswerStyle]}
            pointerEvents={'box-none'}>
            <GameCardAnswerBackground
              answer={1}
              correctAnswer={answer}
              questionAnswer={questionAnswer}
              questionProgress={questionProgress}
            />
            <Animated.View style={styles.leftAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                numberOfLines={3}
                minimumFontScale={0.9}>
                {answers[1]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.secondIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[styles.thirdAnswer, thirdAnswerStyle]}
            pointerEvents={'box-none'}>
            <GameCardAnswerBackground
              answer={2}
              correctAnswer={answer}
              questionAnswer={questionAnswer}
              questionProgress={questionProgress}
            />
            <Animated.View style={styles.rightAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                numberOfLines={3}
                minimumFontScale={0.9}>
                {answers[2]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.thirdIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[styles.fourthAnswer, fourthAnswerStyle]}
            pointerEvents={'box-none'}>
            <GameCardAnswerBackground
              answer={3}
              correctAnswer={answer}
              questionAnswer={questionAnswer}
              questionProgress={questionProgress}
            />
            <Animated.View style={styles.rightAnswers}>
              <BaseText
                type={'texturina-16-semi-bold'}
                style={styles.answerText}
                adjustsFontSizeToFit
                numberOfLines={3}
                minimumFontScale={0.9}>
                {answers[3]}
              </BaseText>
            </Animated.View>
            <Animated.View style={styles.fourthIcon}>
              <CardAnswerSvgIcon />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default GameCardAnswers;

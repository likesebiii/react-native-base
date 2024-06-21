import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface GameCardAnswerBackgroundProps {
  answer: number;
  correctAnswer: number;
  questionProgress: SharedValue<number>;
  questionAnswer: SharedValue<number>;
}

const GameCardAnswerBackground: React.FC<GameCardAnswerBackgroundProps> = ({
  answer,
  correctAnswer,
  questionProgress,
  questionAnswer,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const correctAnswerStyle = useAnimatedStyle(() => {
    if (questionAnswer.value !== answer) {
      return { opacity: 0 };
    }

    if (answer !== correctAnswer) {
      return { opacity: 0 };
    }

    return {
      opacity: interpolate(questionProgress.value, [0, 0.25], [0, 1]),
    };
  });

  const wrongAnswerStyle = useAnimatedStyle(() => {
    if (questionAnswer.value !== answer) {
      return { opacity: 0 };
    }

    if (answer === correctAnswer) {
      return { opacity: 0 };
    }

    return {
      opacity: interpolate(
        questionProgress.value,
        [0, 0.1, 0.2, 0.3],
        [0, 1, 0, 1],
      ),
    };
  });

  return (
    <>
      <Animated.View
        style={[styles.wrongAnswer, wrongAnswerStyle]}
        pointerEvents={'box-none'}
      />
      <Animated.View
        style={[styles.correctAnswer, correctAnswerStyle]}
        pointerEvents={'box-none'}
      />
    </>
  );
};

export default GameCardAnswerBackground;

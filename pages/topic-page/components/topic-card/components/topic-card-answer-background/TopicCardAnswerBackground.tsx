import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';

interface TopicCardAnswerBackgroundProps {
  answer: number;
  correctAnswer: number;
}

const TopicCardAnswerBackground: React.FC<TopicCardAnswerBackgroundProps> = ({
  answer,
  correctAnswer,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { questionAnswer, questionProgress } = useTopicContext();

  const correctAnswerStyle = useAnimatedStyle(() => {
    if (questionAnswer.value !== answer && correctAnswer !== -1) {
      return { opacity: 0 };
    }

    if (answer !== correctAnswer && correctAnswer !== -1) {
      return { opacity: 0 };
    }

    return {
      opacity: interpolate(questionProgress.value, [0, 0.25], [0, 1]),
    };
  });

  const wrongAnswerStyle = useAnimatedStyle(() => {
    if (questionAnswer.value !== answer || correctAnswer === -1) {
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
      <Animated.View style={[styles.wrongAnswer, wrongAnswerStyle]} />
      <Animated.View style={[styles.correctAnswer, correctAnswerStyle]} />
    </>
  );
};

export default TopicCardAnswerBackground;

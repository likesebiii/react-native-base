import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import GameCardAnswers from '../game-card-answers/GameCardAnswers';
import { TopicQuestionsType } from '@utils';
import { THRESHOLD } from 'pages/game-page/constants';

const DEFAULT_TIMEOUT = 1000;

type GameCardQuestionEnvironmentProps = {
  translateX: SharedValue<number>;
  cardOnFocus: SharedValue<number>;
  cardDirection: SharedValue<number>;
  question: TopicQuestionsType;
  onAnswerQuestion?: (correct: boolean) => void;
  type: 'me' | 'enemy';
  initialCount: number;
};

const GameCardQuestionEnvironment: React.FC<
  GameCardQuestionEnvironmentProps
> = ({
  translateX,
  cardOnFocus,
  cardDirection,
  question,
  onAnswerQuestion,
  type,
}) => {
  const { screenHeight, screenWidth } = useBaseAspect(aspectStyle);

  const blockInteractions = useSharedValue(false);

  const initialQuestionTranslateX = useSharedValue(0);

  const timeout = useSharedValue(0);
  const secondTimeout = useSharedValue(0);

  const translate = useDerivedValue(() => {
    return translateX.value - initialQuestionTranslateX.value;
  });
  const forceTranslate = useSharedValue(0);

  const questionAnswer = useSharedValue(4);
  const questionProgress = useSharedValue(0);

  const disablePan = useSharedValue(0);

  const clearStart = () => {
    setTimeout(() => {
      blockInteractions.value = false;
    }, DEFAULT_TIMEOUT);
  };

  const questionPan = Gesture.Pan()
    .onStart(() => {
      if (blockInteractions.value) {
        disablePan.value = 1;
      } else {
        disablePan.value = 0;

        initialQuestionTranslateX.value = translateX.value;

        questionProgress.value = 0;
        questionAnswer.value = 4;
      }
    })
    .onChange((event) => {
      if (blockInteractions.value || disablePan.value) {
        return;
      }

      translateX.value = initialQuestionTranslateX.value + event.translationX;

      if (questionAnswer.value === 4) {
        const absoluteTranslateY = event.absoluteY - screenHeight / 2;

        // Determine card direction
        if (absoluteTranslateY > 10 && cardDirection.value <= 0) {
          cardDirection.value = withTiming(1.0);
        } else if (absoluteTranslateY < 10 && cardDirection.value >= 0) {
          cardDirection.value = withTiming(-1.0);
        }
      }
    })
    .onEnd((event) => {
      if (blockInteractions.value || disablePan.value) {
        return;
      }

      blockInteractions.value = true;

      if (Math.abs(event.translationX) < THRESHOLD || type == 'me') {
        // Check for horizontal swipe
        translateX.value = withTiming(0, {}, () => {
          blockInteractions.value = false;
        });
      } else {
        const target =
          (event.translationX < 0 ? -screenWidth : screenWidth) * 1.5;

        if (event.translationX < 0) {
          if (cardDirection.value <= 0) {
            questionAnswer.value = 0;
          } else {
            questionAnswer.value = 1;
          }
        } else {
          if (cardDirection.value <= 0) {
            questionAnswer.value = 2;
          } else {
            questionAnswer.value = 3;
          }
        }

        translateX.value = withTiming(target, { duration: 500 }, () => {
          timeout.value = withTiming(
            timeout.value + 1,
            { duration: 1500, easing: Easing.linear },
            () => {
              onAnswerQuestion &&
                runOnJS(onAnswerQuestion)(
                  question.answer === -1
                    ? true
                    : questionAnswer.value === question.answer,
                );
            },
          );
          questionProgress.value = withTiming(1.0, { duration: 2000 }, () => {
            cardDirection.value = 0;
            questionAnswer.value = 4;

            translateX.value = withTiming(0, {}, () => {
              runOnJS(clearStart)();
            });
          });
        });
      }
    });

  const focusCurtainAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOnFocus.value === 1 ? withTiming(0.6) : 0,
      transform: [{ scale: cardOnFocus.value }],
    };
  });

  const computerPlayerAnswerQuestion = () => {
    'worklet';

    const randomTime = Math.random() * (5 - 1) + 5;

    const executeFunction = () => {
      blockInteractions.value = true;

      const randomWrongAnswers = [0, 1, 2, 3].filter(
        (element) => element !== question.answer,
      );
      const randomAnswer =
        Math.random() > 0.5
          ? question.answer
          : randomWrongAnswers[Math.floor(Math.random() * 3)];

      questionAnswer.value = randomAnswer;
      if (randomAnswer === 0 || randomAnswer === 2) {
        cardDirection.value = withDelay(100, withTiming(-1));

        if (randomAnswer === 0) {
          forceTranslate.value = -THRESHOLD - 1;
        } else {
          forceTranslate.value = THRESHOLD + 1;
        }
      } else {
        cardDirection.value = withDelay(100, withTiming(1));

        if (randomAnswer === 1) {
          forceTranslate.value = -THRESHOLD - 1;
        } else {
          forceTranslate.value = THRESHOLD + 1;
        }
      }

      const target =
        (randomAnswer === 1 || randomAnswer === 3
          ? -screenWidth
          : screenWidth) * 1.5;

      translateX.value = withTiming(target, { duration: 500 }, () => {
        timeout.value = withTiming(
          timeout.value + 1,
          { duration: 1500, easing: Easing.linear },
          () => {
            onAnswerQuestion &&
              runOnJS(onAnswerQuestion)(
                question.answer === -1
                  ? true
                  : questionAnswer.value === question.answer,
              );
          },
        );

        questionProgress.value = withTiming(1.0, { duration: 2000 }, () => {
          cardDirection.value = 0;
          questionAnswer.value = 4;

          translateX.value = withTiming(0, {}, () => {
            runOnJS(clearStart)();
          });
        });
      });
    };

    secondTimeout.value = withDelay(
      randomTime * 1000,
      withTiming(secondTimeout.value + 1, { duration: 0 }, executeFunction),
    );
  };

  useDerivedValue(() => {
    cardOnFocus.value;

    if (type === 'me' && cardOnFocus.value === 1) {
      computerPlayerAnswerQuestion();
    }
  });

  return (
    <>
      <GameCardAnswers
        answer={question.answer}
        answers={question.answers as any as string[]}
        cardDirection={cardDirection}
        translate={translate}
        forceTranslate={forceTranslate}
        cardOnFocus={cardOnFocus}
        questionAnswer={questionAnswer}
        questionProgress={questionProgress}
        type={type}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'black',
            transform: [{ scale: 0 }],
            zIndex: 3,
          },
          focusCurtainAnimatedStyle,
        ]}
      />

      <GestureDetector gesture={questionPan}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              opacity: 0.3,
              transform: [{ scale: 0 }],
              zIndex: 5,
            },
            focusCurtainAnimatedStyle,
          ]}
        />
      </GestureDetector>
    </>
  );
};

export default GameCardQuestionEnvironment;

import { CARDS_NSI_LIMIT } from '@utils';
import {
  NUMBER_OF_CARDS,
  THRESHOLD,
  THRESHOLD_Y,
} from 'pages/topic-page/context/TopicProvider';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import {
  Gesture,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  SharedValue,
  cancelAnimation,
  runOnJS,
  runOnUI,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { TopicCardContentType } from 'utils/content';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { Platform } from 'react-native';
import React from 'react';
import { Dimensions, useSelectVortex, Vibrations, Vortex } from '@services';

const DEFAULT_TIMEOUT = 500;
const ANSWER_TIMEOUT = 250;

export type TopicCardGestureType =
  | 'up'
  | 'down'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export const useTopicCardGestures = ({
  content,
  count,
  screenHeight,
  index,
  answer,
  sharedIndex,
  changeIndex,
  onSwipeDown,
  onSwipeUp,
  onSwipe,
  onAnswerQuestion,
  bottomInset,
  isEmptyQuestion,
  disableGestures,
  disableHorizontalGestures,
  isLastQuestionAnswerable,
  enableVerticalSwipe: enableVerticalSwipeFromProps,
  disableUpGesture: disableUpGestureFromProps,
  disableLivesBlocking = false,
  onTapStart,
  retryStateValue,
}: {
  content: TopicCardContentType[];
  count: number;
  screenHeight: number;
  index: number;
  answer: number;
  sharedIndex: SharedValue<number>;
  changeIndex: () => void;
  enableVerticalSwipe?: boolean;
  onSwipe?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onAnswerQuestion?: (correct: boolean, answer: number) => void;
  bottomInset?: number;
  isEmptyQuestion?: boolean;
  disableGestures?: boolean;
  disableHorizontalGestures?: boolean;
  disableUpGesture?: boolean;
  isLastQuestionAnswerable: boolean;
  disableLivesBlocking?: boolean;
  onTapStart?: () => void;
  retryStateValue: SharedValue<'initial' | 'retried' | undefined>;
}) => {
  const screenWidth = Dimensions.get('width');

  const { cardZIndex, questionAnswer, questionProgress, pressedCard } =
    useTopicContext();

  const blockInteractions = useSharedValue(false);

  const isNSI = useSelectVortex('user-vortex', 'selectIsNSI');

  const lives = useSelectVortex('user-vortex', 'selectUserLives');

  const navigateToAuthDrawer = () => {
    NAVIGATION_CONTROLLER.navigate('fk.RegisterDrawer', { type: 'nsi-limit' });
  };

  const navigateToBlockingDrawer = () => {
    NAVIGATION_CONTROLLER.navigate('fk.LivesDrawer', { type: 'blocking' });
  };

  const limitNSI = useSelectVortex(
    'user-vortex',
    (userObject) => userObject.setup.limitNSI,
  );

  const maxLength = content.length;
  const maxLengthAnimated = useDerivedValue(() => {
    return maxLength;
  }, [content.length]);

  const backCoverEnabled = useSharedValue(1);

  const enableVerticalSwipe =
    content[sharedIndex.value]?.id === -4
      ? false
      : isLastQuestionAnswerable
      ? true
      : enableVerticalSwipeFromProps;
  const disableUpGesture = isLastQuestionAnswerable
    ? true
    : disableUpGestureFromProps;

  // For card direction
  // 1.0 means that it goes up
  // -1.0 means that it goes down
  const cardDirection = useSharedValue(0);
  const cardDirectionAnimated = useSharedValue(0);

  const enableVertical = useSharedValue(0);
  const animatedTranslateY = useSharedValue(0);
  const initialTranslateY = useSharedValue(0);
  const translateY = useSharedValue(0);

  const translateX = useSharedValue(0);
  const initialTranslateX = useSharedValue(0);
  const animatedInitialTranslateX = useSharedValue(0);

  const blockStart = useSharedValue(false);
  const zIndex = useSharedValue(cardZIndex.value + (2 - count));
  const opacity = useSharedValue(1);

  const vibrateHorizontal = useSharedValue(0);
  const vibrateVertical = useSharedValue(0);

  React.useEffect(() => {
    if (Platform.OS !== 'ios') {
      zIndex.value = withSequence(
        withTiming(cardZIndex.value + (2 - count) - 0.1),
        withTiming(cardZIndex.value + (2 - count)),
      );
    }
  }, []);

  const onSwipeCallback = () => {
    onSwipe?.();
    if (Vortex.select('user-vortex', 'selectIsNSI')) {
      Vortex.dispatch('user-vortex', 'incrementNSILimit')();
    }
  };

  const clearStart = () => {
    setTimeout(() => {
      blockInteractions.value = false;
    }, DEFAULT_TIMEOUT);
  };

  const softResetParams = (visible?: boolean) => {
    'worklet';

    pressedCard.value = -1;
    opacity.value = visible ? 1 : 0;
    cardDirection.value = 0;
    cardDirectionAnimated.value = 0;
    questionProgress.value = 0;
    animatedTranslateY.value = 0;
    initialTranslateY.value = 0;
    questionAnswer.value = 4;
  };

  const resetParams = (forceIncrementZIndex?: boolean) => {
    'worklet';

    // When retrying a question
    // The zIndex should not be incremented
    // We check for retried as there is a delay on reset params
    if (retryStateValue.value !== 'retried' || forceIncrementZIndex !== false) {
      zIndex.value =
        Platform.OS === 'ios'
          ? cardZIndex.value - 1
          : withTiming(cardZIndex.value - 1);
      cardZIndex.value =
        Platform.OS === 'ios'
          ? cardZIndex.value - 1
          : withTiming(cardZIndex.value - 1);
    }
    softResetParams();

    if (index + NUMBER_OF_CARDS < (maxLengthAnimated.value ?? 0)) {
      backCoverEnabled.value = Platform.OS === 'ios' ? 1 : withTiming(1);
    }
  };

  const resetParamsOnVertical = (target: number) => {
    'worklet';

    resetParams(true);

    translateX.value = 0;
    animatedInitialTranslateX.value = 0;
    initialTranslateX.value = 0;
    translateY.value = withTiming(0, { duration: 500 }, () => {
      if (index + NUMBER_OF_CARDS < (maxLengthAnimated.value ?? 0)) {
        opacity.value = 1;
      }

      if (target < 0) {
        onSwipeUp && runOnJS(onSwipeUp)();
        runOnJS(onSwipeCallback)();
      } else {
        onSwipeDown && runOnJS(onSwipeDown)();
        runOnJS(onSwipeCallback)();
      }

      runOnJS(clearStart)();
      runOnJS(changeIndex)();
    });
  };

  const resetParamsOnHorizontal = (forceIncrementZIndex?: boolean) => {
    'worklet';

    resetParams(forceIncrementZIndex);

    translateY.value = 0;
    animatedInitialTranslateX.value = withTiming(0);
    translateX.value = withTiming(0, { duration: 500 }, () => {
      if (index + NUMBER_OF_CARDS < (maxLengthAnimated.value ?? 0)) {
        opacity.value = 1;
      }

      runOnJS(clearStart)();
      runOnJS(changeIndex)();
    });
  };

  const vibrate = () => {
    Vibrations.trigger('light');
  };

  const onAnswer = (correct: boolean, answer: number) => {
    onAnswerQuestion?.(correct, answer);

    if (retryStateValue.value !== 'retried') {
      setTimeout(() => {
        if (correct) {
          Vibrations.trigger('success');
        } else {
          Vibrations.trigger('error');
        }
      }, ANSWER_TIMEOUT);
    }
  };

  const onSwipeRestore = () => {
    'worklet';

    translateX.value = withTiming(0, {}, () => {
      blockInteractions.value = false;
    });
    animatedInitialTranslateX.value = withTiming(0);
    initialTranslateX.value = 0;

    animatedTranslateY.value = withTiming(0);
    translateY.value = withTiming(0);
  };

  const onSwipeVertical = (target: number) => {
    'worklet';

    if (CARDS_NSI_LIMIT <= limitNSI && isNSI) {
      runOnJS(navigateToAuthDrawer)();
      onSwipeRestore();
    } else if (lives === 0 && disableLivesBlocking === false) {
      // The card should have animate
      // but it's the life restriction
      runOnJS(navigateToBlockingDrawer)();
      onSwipeRestore();
    } else {
      translateY.value = withTiming(target, {}, () => {
        resetParamsOnVertical(target);
      });
    }
  };

  const onSwipeHorizontal = (
    target: number,
    directionX: number,
    directionY: number,
  ) => {
    'worklet';

    const question: {
      correct: boolean | undefined;
    } = { correct: undefined };

    if (CARDS_NSI_LIMIT <= limitNSI && isNSI) {
      runOnJS(navigateToAuthDrawer)();
      onSwipeRestore();
    } else if (lives === 0 && disableLivesBlocking === false) {
      // The card should have animate
      // but it's the life restriction
      runOnJS(navigateToBlockingDrawer)();
      onSwipeRestore();
    } else {
      if (content[sharedIndex.value].type === 'question') {
        if (directionX < 0) {
          if (directionY <= 0) {
            questionAnswer.value = 0;
          } else {
            questionAnswer.value = 1;
          }
        } else {
          if (directionY <= 0) {
            questionAnswer.value = 2;
          } else {
            questionAnswer.value = 3;
          }
        }

        question.correct =
          answer === -1 ? true : questionAnswer.value === answer;
        runOnJS(onAnswer)(question.correct, questionAnswer.value);
      }

      runOnJS(onSwipeCallback)();

      translateX.value = withTiming(target, {}, () => {
        if (
          content[sharedIndex.value].type === 'question' &&
          retryStateValue.value !== 'retried'
        ) {
          questionProgress.value = withTiming(1.0, { duration: 2000 }, () => {
            if (content[sharedIndex.value].id === -4) {
              onSwipeRestore();
              softResetParams(true);
            } else {
              resetParamsOnHorizontal(question.correct);
            }
          });
        } else {
          if (content[sharedIndex.value].id === -4) {
            onSwipeRestore();
            softResetParams(true);
          } else {
            resetParamsOnHorizontal();
          }
        }
      });
    }
  };

  const determineCardDirection = (
    event:
      | GestureStateChangeEvent<PanGestureHandlerEventPayload>
      | GestureUpdateEvent<
          PanGestureHandlerEventPayload & PanGestureChangeEventPayload
        >,
  ) => {
    'worklet';

    const absoluteTranslateY =
      event.absoluteY - screenHeight / 2 + (bottomInset ?? 0) / 2 - 90;

    // Determine card direction
    if (absoluteTranslateY > 10 && cardDirection.value <= 0) {
      cancelAnimation(cardDirectionAnimated);
      cardDirectionAnimated.value = withTiming(1.0);
      cardDirection.value = 1.0;
    } else if (absoluteTranslateY < 10 && cardDirection.value >= 0) {
      cancelAnimation(cardDirectionAnimated);
      cardDirectionAnimated.value = withTiming(-1.0);
      cardDirection.value = -1.0;
    }
  };

  const tap = Gesture.Tap().onStart(() => {
    onTapStart && runOnJS(onTapStart)();

    pressedCard.value = -1;
  });
  const pan = Gesture.Pan()
    .onStart((event) => {
      if (blockInteractions.value) {
        blockStart.value = true;
      } else if (
        cardZIndex.value + NUMBER_OF_CARDS - 1 !== zIndex.value ||
        isEmptyQuestion ||
        disableGestures === true
      ) {
        blockStart.value = true;
      } else {
        blockStart.value = false;

        // Reset initial translate
        pressedCard.value = -1;
        onTapStart && runOnJS(onTapStart)();

        initialTranslateY.value = 0;
        animatedInitialTranslateX.value = 0;
        initialTranslateX.value = 0;
        enableVertical.value = 0;
        vibrateHorizontal.value = 0;
        vibrateVertical.value = 0;

        if (!disableHorizontalGestures) {
          animatedInitialTranslateX.value = withTiming(
            event.absoluteX - screenWidth / 2,
          );
          initialTranslateX.value = event.absoluteX - screenWidth / 2;
        }
      }
    })
    .onChange((event) => {
      if (blockInteractions.value || blockStart.value) {
        return;
      }

      determineCardDirection(event);
      // Check if vertical direction should be enabled
      if (enableVerticalSwipe) {
        if (
          Math.abs(event.translationX + initialTranslateX.value) < THRESHOLD &&
          Math.abs(event.translationY) > Math.abs(event.translationX)
        ) {
          if (enableVertical.value === 0) {
            enableVertical.value = 1;
            if (!disableUpGesture || event.translationY >= 0) {
              initialTranslateY.value = event.translationY;
              animatedTranslateY.value = withTiming(event.translationY);
            } else {
              initialTranslateY.value = 0;
              animatedTranslateY.value = 0;
            }
          }
        } else if (
          Math.abs(event.translationX + initialTranslateX.value) >= THRESHOLD &&
          !disableHorizontalGestures
        ) {
          enableVertical.value = 0;
          animatedTranslateY.value = withTiming(0);
          translateY.value = withTiming(0);
        }
      }
      // Change the translateY accordingly
      if (enableVertical.value && enableVerticalSwipe) {
        translateY.value = event.translationY - initialTranslateY.value;

        if (disableUpGesture && translateY.value < -initialTranslateY.value) {
          translateY.value = -initialTranslateY.value;
        }

        if (
          vibrateVertical.value === 0 &&
          Math.abs(animatedTranslateY.value + translateY.value) >= THRESHOLD_Y
        ) {
          runOnJS(vibrate)();
          vibrateVertical.value = 1;
        } else if (
          vibrateVertical.value !== 0 &&
          Math.abs(animatedTranslateY.value + translateY.value) < THRESHOLD_Y
        ) {
          runOnJS(vibrate)();
          vibrateVertical.value = 0;
        }
      }

      if (!disableHorizontalGestures) {
        translateX.value = event.translationX;

        if (
          vibrateHorizontal.value === 0 &&
          Math.abs(translateX.value + initialTranslateX.value) >= THRESHOLD
        ) {
          runOnJS(vibrate)();
          vibrateHorizontal.value = cardDirection.value;
        } else if (vibrateHorizontal.value !== 0) {
          if (
            Math.abs(translateX.value + initialTranslateX.value) < THRESHOLD
          ) {
            runOnJS(vibrate)();
            vibrateHorizontal.value = 0;
          } else if (
            (cardDirection.value === 1 || cardDirection.value === -1) &&
            cardDirection.value !== vibrateHorizontal.value &&
            content[sharedIndex.value].type === 'question'
          ) {
            runOnJS(vibrate)();
            vibrateHorizontal.value = cardDirection.value;
          }
        }
      }
    })
    .onEnd((_) => {
      if (blockInteractions.value || blockStart.value) {
        return;
      }

      blockInteractions.value = true;

      // Check for vertical swipe
      if (
        Math.abs(animatedTranslateY.value + translateY.value) >= THRESHOLD_Y &&
        (disableLivesBlocking === true || lives !== 0)
      ) {
        const target =
          animatedTranslateY.value + translateY.value < 0
            ? -screenHeight
            : screenHeight;

        onSwipeVertical(target);
      } else if (
        Math.abs(translateX.value + initialTranslateX.value) < THRESHOLD ||
        (lives === 0 && disableLivesBlocking === false)
      ) {
        if (lives === 0) {
          if (
            Math.abs(translateX.value + initialTranslateX.value) >= THRESHOLD ||
            Math.abs(animatedTranslateY.value + translateY.value) >= THRESHOLD_Y
          ) {
            // The card should have animate
            // but it's the life restriction
            runOnJS(navigateToBlockingDrawer)();
          }
        }
        // Check for horizontal swipe
        onSwipeRestore();
      } else {
        const target =
          (translateX.value + initialTranslateX.value < 0
            ? -screenWidth
            : screenWidth) * 1.5;

        onSwipeHorizontal(
          target,
          translateX.value + initialTranslateX.value,
          cardDirection.value,
        );
      }
    });

  const gesture = Gesture.Simultaneous(pan, tap);

  const simulateGesture = (type: TopicCardGestureType) => {
    if (isEmptyQuestion || blockInteractions.value === true) {
      return;
    }

    blockInteractions.value = true;

    onTapStart?.();

    switch (type) {
      case 'up':
        enableVertical.value = 1;
        runOnUI(onSwipeVertical)(-screenHeight);
        break;
      case 'down':
        enableVertical.value = 1;
        runOnUI(onSwipeVertical)(screenHeight);
        break;
      case 'left-top':
        cardDirectionAnimated.value = -1;
        runOnUI(onSwipeHorizontal)(-Dimensions.get('width') * 1.5, -1, -1);
        break;
      case 'left-bottom':
        cardDirectionAnimated.value = 1;
        runOnUI(onSwipeHorizontal)(-Dimensions.get('width') * 1.5, -1, 1);
        break;
      case 'right-top':
        cardDirectionAnimated.value = -1;
        runOnUI(onSwipeHorizontal)(Dimensions.get('width') * 1.5, 1, -1);
        break;
      case 'right-bottom':
        cardDirectionAnimated.value = 1;
        runOnUI(onSwipeHorizontal)(Dimensions.get('width') * 1.5, 1, 1);
        break;
      default:
        break;
    }
  };

  return {
    gesture,
    opacity,
    translateX,
    translateY,
    animatedInitialTranslateX,
    animatedTranslateY,
    cardDirection,
    cardDirectionAnimated,
    zIndex,
    backCoverEnabled,
    enableVertical,
    simulateGesture,
  };
};

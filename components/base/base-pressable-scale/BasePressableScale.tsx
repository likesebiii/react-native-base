import React, { useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';

type BasePressableScaleProps = TouchableWithoutFeedbackProps &
  Partial<Omit<WithSpringConfig, 'mass'>> & {
    children: React.ReactNode;
    /**
     * The value to scale to when the Pressable is being pressed.
     * @default 0.95
     */
    activeScale?: number;
    /**
     * The weight physics of this button
     * @default 'heavy'
     */
    weight?: 'light' | 'medium' | 'heavy';
    /**
     * Styling the button container
     */
    containerStyle?: StyleProp<ViewStyle>;
  };

const ReanimatedTouchableWithoutFeedback = Reanimated.createAnimatedComponent(
  TouchableWithoutFeedback,
);

/**
 * A Pressable that scales down when pressed. Uses the JS Pressability API.
 * @source https://github.com/mrousavy/react-native-pressable-scale/blob/main/src/PressableScale.tsx
 */
export const BasePressableScale = (
  props: BasePressableScaleProps,
): React.ReactElement => {
  const {
    activeScale = 0.95,
    weight = 'heavy',
    damping = 15,
    stiffness = 150,
    overshootClamping = true,
    restSpeedThreshold = 0.001,
    restDisplacementThreshold = 0.001,
    style,
    onPressIn: _onPressIn,
    onPressOut: _onPressOut,
    delayPressIn = 0,
    children,
    containerStyle,
    ...passThroughProps
  } = props;

  const mass = useMemo(() => {
    switch (weight) {
      case 'light':
        return 0.15;
      case 'medium':
        return 0.2;
      case 'heavy':
      default:
        return 0.3;
    }
  }, [weight]);

  const isPressedIn = useSharedValue(false);

  const timeout = React.useRef<NodeJS.Timeout>();

  const springConfig = useMemo<WithSpringConfig>(
    () => ({
      damping,
      mass,
      stiffness,
      overshootClamping,
      restSpeedThreshold,
      restDisplacementThreshold,
    }),
    [
      damping,
      mass,
      overshootClamping,
      restDisplacementThreshold,
      restSpeedThreshold,
      stiffness,
    ],
  );

  const touchableStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(isPressedIn.value ? activeScale : 1, springConfig),
        },
      ],
      opacity: withSpring(isPressedIn.value ? 0.95 : 1, springConfig),
    }),
    [activeScale, isPressedIn, springConfig],
  );

  const onPressInWithTimeout = () => {
    timeout.current = setTimeout(() => {
      isPressedIn.value = true;
    }, 50);
  };

  const onPressIn = useCallback(
    (event: GestureResponderEvent) => {
      onPressInWithTimeout();
      _onPressIn?.(event);
    },
    [_onPressIn, isPressedIn],
  );
  const onPressOut = useCallback(
    (event: GestureResponderEvent) => {
      clearTimeout(timeout.current);
      timeout.current = undefined;

      isPressedIn.value = false;
      _onPressOut?.(event);
    },
    [_onPressOut, isPressedIn],
  );

  return (
    <ReanimatedTouchableWithoutFeedback
      delayPressIn={delayPressIn}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={touchableStyle}
      {...passThroughProps}>
      <View style={[style, containerStyle]}>{children}</View>
    </ReanimatedTouchableWithoutFeedback>
  );
};

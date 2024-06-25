import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { colors } from '@theme';
import { Vibrations } from '@services';

const TIMING_CONFIG = {
  duration: 250,
};

type BaseSwitchProps = {
  value?: boolean;
  onChange?: () => void;
};

const BaseSwitch: React.FC<BaseSwitchProps> = ({ value, onChange }) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const animated = useSharedValue(value ? 1 : 0);

  const onToggleAnimate = () => {
    if (animated.value !== 0) {
      animated.value = withTiming(0, TIMING_CONFIG);
    } else {
      animated.value = withTiming(1, TIMING_CONFIG);
    }
  };

  const onToggle = () => {
    onToggleAnimate();

    Vibrations.trigger('light');
    onChange?.();
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animated.value,
        [0, 1],
        [colors[theme].main.separator, colors[theme].text.primary],
      ),
    };
  });

  const innerButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: interpolate(animated.value, [0, 1], [6, 20]) }],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <Animated.View style={[styles.innerButton, innerButtonAnimatedStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BaseSwitch;

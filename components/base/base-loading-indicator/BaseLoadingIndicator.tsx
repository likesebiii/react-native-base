import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { aspectStyle } from './aspect';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import { colors } from '@theme';
import { useBaseAspect } from '@hooks';

const TIMING_CONFIG: WithTimingConfig = {
  duration: 850,
  easing: Easing.bezier(0.65, 0.4, 0.28, 1).factory(),
};

type BaseLoadingIndicatorProps = {
  loading: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export const BaseLoadingIndicator: React.FC<BaseLoadingIndicatorProps> = ({
  style,
  loading,
  color,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const animated = useSharedValue(0);

  const animate = () => {
    animated.value = 0;
    animated.value = withRepeat(withTiming(360, TIMING_CONFIG), -1, false);
  };

  React.useEffect(animate, []);

  const firstAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${animated.value}deg`,
        },
      ],
    };
  });

  const secondAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${animated.value * 1.45}deg`,
        },
      ],
    };
  });

  return (
    <View style={[styles.container, style]}>
      {loading ? (
        <Animated.View
          style={[
            styles.circle,
            styles.firstIndicator,
            {
              borderStartColor: color ?? colors[theme].text.secondary,
              borderEndColor: color ?? colors[theme].text.secondary,
            },
            firstAnimatedStyle,
          ]}
        />
      ) : undefined}
      {loading ? (
        <Animated.View
          style={[
            styles.circle,
            styles.secondIndicator,
            {
              borderStartColor: color ?? colors[theme].text.secondary,
              borderEndColor: color ?? colors[theme].text.secondary,
            },
            secondAnimatedStyle,
          ]}
        />
      ) : null}
    </View>
  );
};

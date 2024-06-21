import React from 'react';
import { StyleProp, TextStyle, View, StyleSheet } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import BaseAnimatedText from '../base-animated-text/BaseAnimatedText';
import { BaseText } from '../base-text/BaseText';

type BaseAnimatedCountdownProps = {
  animated: SharedValue<number>;
  textStyle?: StyleProp<TextStyle>;
  type?: 'seconds' | 'minutes' | 'hours';
  dots?: boolean;
};

const BaseAnimatedCountdown: React.FC<BaseAnimatedCountdownProps> = ({
  animated,
  textStyle,
  type = 'seconds',
  dots,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const animatedValue = useDerivedValue(() => {
    if (type === 'seconds') {
      return animated.value % 60;
    } else if (type === 'minutes') {
      return withTiming(Math.max(0, Math.floor((animated.value % 3600) / 60)), {
        duration: 1000,
      });
    } else {
      return withTiming(
        Math.max(0, Math.floor((animated.value % 86400) / 3600)),
        {
          duration: 1000,
        },
      );
    }
  }, []);

  const styleText: TextStyle = React.useMemo(
    () => ({ ...styles.text, ...StyleSheet.flatten(textStyle) }),
    [textStyle, theme],
  );

  const textHeight = React.useMemo(() => {
    return (styleText.fontSize ?? 26) + 4;
  }, [styleText]);

  const firstNumber = useDerivedValue(() => {
    const result = Math.ceil(animatedValue.value);

    if (result === 60) {
      return '00';
    }

    if (result % 2 === 1) {
      return `${result - 1 < 10 ? '0' : ''}${result - 1}`;
    } else {
      return `${result < 10 ? '0' : ''}${result}`;
    }
  });

  const secondNumber = useDerivedValue(() => {
    const result = Math.ceil(animatedValue.value - 1);

    if (result % 2 === 0) {
      return `${result + 1 < 10 ? '0' : ''}${result + 1}`;
    } else {
      return `${result < 10 ? '0' : ''}${result}`;
    }
  });

  const firstAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: textHeight / 10 },
        {
          translateY:
            textHeight / 5 +
            -(textHeight * 1.2) * (-1 + (animatedValue.value % 2)),
        },
      ],
    };
  });

  const secondAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: textHeight / 10 },
        {
          translateY:
            textHeight / 5 +
            -(textHeight * 1.2) *
              (-1 +
                ((animatedValue.value < 1
                  ? 1 + animatedValue.value
                  : animatedValue.value - 1) %
                  2)),
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          height: textHeight,
          width: textHeight + textHeight / 3,
        },
      ]}>
      <Animated.View style={[styles.content, firstAnimatedStyle]}>
        <BaseAnimatedText text={secondNumber} style={styleText} />
      </Animated.View>

      <Animated.View style={[styles.content, secondAnimatedStyle]}>
        <BaseAnimatedText text={firstNumber} style={styleText} />
      </Animated.View>
      {dots ? (
        <View style={styles.dots}>
          <BaseText style={styleText}>{':'}</BaseText>
        </View>
      ) : undefined}
    </View>
  );
};

export default BaseAnimatedCountdown;

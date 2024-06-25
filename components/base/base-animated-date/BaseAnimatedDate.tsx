import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import BaseAnimatedCountdown from '../base-animated-countdown/BaseAnimatedCountdown';
import {
  cancelAnimation,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getDateDifferenceInSeconds } from '@utils';

type BaseAnimatedDateProps = {
  date: string;
  onFinish?: () => void;
};

const BaseAnimatedDate: React.FC<BaseAnimatedDateProps> = ({
  date,
  onFinish: onFinishFromProps,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const secondsDifference = React.useMemo(
    () =>
      getDateDifferenceInSeconds(
        date,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
      ),
    [date],
  );

  const animatedValue = useSharedValue(secondsDifference);
  const finishCalled = useSharedValue(false);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  const onCancel = () => {
    cancelAnimation(animatedValue);
    clearInterval(intervalRef.current);
  };
  const onFinish = () => {
    onFinishFromProps?.();
    onCancel();
  };

  React.useEffect(() => {
    onCancel();
    animatedValue.value = withTiming(animatedValue.value - 1, {
      duration: 1000,
    });
    intervalRef.current = setInterval(() => {
      animatedValue.value = withTiming(animatedValue.value - 1, {
        duration: 1000,
      });
    }, 1000);
  }, []);

  useDerivedValue(() => {
    if (animatedValue.value <= 0 && finishCalled.value === false) {
      finishCalled.value = true;

      runOnJS(onFinish)();
    }
  });

  return (
    <View style={styles.container}>
      <BaseAnimatedCountdown
        animated={animatedValue}
        textStyle={styles.text}
        type={'hours'}
        dots
      />
      <BaseAnimatedCountdown
        animated={animatedValue}
        textStyle={styles.text}
        type={'minutes'}
        dots
      />
      <BaseAnimatedCountdown animated={animatedValue} textStyle={styles.text} />
    </View>
  );
};

export default BaseAnimatedDate;

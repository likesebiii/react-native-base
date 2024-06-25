import { withDelay, withTiming } from 'react-native-reanimated';

export const entering = () => {
  'worklet';

  const animations = {
    opacity: withDelay(200, withTiming(1, { duration: 300 })),
    transform: [
      {
        translateX: withDelay(200, withTiming(0, { duration: 300 })),
      },
    ],
  };

  const initialValues = {
    opacity: 0,
    transform: [{ translateX: 200 }],
  };

  return {
    initialValues,
    animations,
  };
};

export const exiting = () => {
  'worklet';

  const animations = {
    opacity: withDelay(200, withTiming(0, { duration: 300 })),
    transform: [
      {
        translateX: withDelay(200, withTiming(-200, { duration: 300 })),
      },
    ],
  };

  const initialValues = {
    opacity: 1,
    transform: [{ translateX: 0 }],
  };

  return {
    initialValues,
    animations,
  };
};

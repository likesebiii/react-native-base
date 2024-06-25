import React from 'react';
import { BackHandler } from 'react-native';

const useBaseBackPress = (
  onHardwareBackPress?: () => void,
  dependencies?: React.DependencyList,
) => {
  const hardwareBackPress = React.useCallback(
    () => {
      onHardwareBackPress?.();

      return true;
    },
    onHardwareBackPress ? [onHardwareBackPress] : [],
  );

  React.useEffect(() => {
    const listener = BackHandler.addEventListener(
      'hardwareBackPress',
      hardwareBackPress,
    );

    return listener.remove;
  }, dependencies ?? [hardwareBackPress]);
};

export default useBaseBackPress;

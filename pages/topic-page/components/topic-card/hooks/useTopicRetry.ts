import React from 'react';
import { useSharedValue } from 'react-native-reanimated';

export const useTopicRetry = ({ retry }: { retry?: boolean }) => {
  const [retryState, setRetryState] = React.useState<
    'initial' | 'retried' | undefined
  >(retry ? 'initial' : undefined);
  const retryStateValue = useSharedValue(retryState);
  const actionOnIncrement = React.useRef<
    'normal' | 'ignore' | 'change-retry'
  >();

  const setRetryValue = (value?: 'initial' | 'retried') => {
    setRetryState(value);
    retryStateValue.value = value;
  };

  return {
    retryState,
    setRetryState: setRetryValue,
    actionOnIncrement,
    retryStateValue,
  };
};

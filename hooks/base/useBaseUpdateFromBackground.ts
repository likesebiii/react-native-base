import { AppState, AppStateStatus } from 'react-native';
import { Listener } from '@types';
import React from 'react';

const useBaseUpdateFromBackground = ({
  onUpdate,
}: {
  onUpdate: () => void;
}) => {
  const state = React.useRef(AppState.currentState);

  const onChange = (next: AppStateStatus) => {
    if (state.current && next === 'active' && state.current !== next) {
      onUpdate();
    }

    state.current = next;
  };

  React.useEffect(() => {
    const listener: Listener = AppState.addEventListener('change', onChange);

    return listener.remove;
  }, [onUpdate]);
};

export default useBaseUpdateFromBackground;

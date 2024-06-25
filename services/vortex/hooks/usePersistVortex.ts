import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Vortex } from '../utils';

const usePersistVortex = () => {
  const appState = React.useRef(AppState.currentState);

  const appStateChangeListener = (nextAppState: AppStateStatus) => {
    if (appState.current === 'active' && nextAppState !== appState.current) {
      Vortex.persist();
    }

    appState.current = nextAppState;
  };

  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      appStateChangeListener,
    );

    return subscription.remove;
  }, []);
};

export default usePersistVortex;

import { NAVIGATION_CONTROLLER } from 'services/navigation';
import React from 'react';
import { useSelectRedux, Vortex } from '@services';

const useRootShowSetup = () => {
  const { sessions } = useSelectRedux('current', 'currentUser', 'sessions');

  React.useEffect(() => {
    const lastStep = Vortex.select('user-vortex', 'selectSetupLastStepCount');

    if (lastStep !== -1 && lastStep !== undefined) {
      NAVIGATION_CONTROLLER.navigate('fk.SetupPage', {});
    } else if (lastStep === -1) {
      // The user has finished the onboarding
    }
  }, []);

  React.useEffect(() => {
    const lastStep = Vortex.select('user-vortex', 'selectSetupLastStepCount');

    if (sessions === 1 || Vortex.select('user-vortex', 'selectIsNSI')) {
      if (lastStep === undefined) {
        Vortex.dispatch('user-vortex', 'incrementSetupStep')(0);
        NAVIGATION_CONTROLLER.navigate('fk.SetupPage', {});
      }
    }
  }, [sessions]);
};

export default useRootShowSetup;

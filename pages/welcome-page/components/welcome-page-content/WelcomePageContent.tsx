import React from 'react';
import { useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageInitialPage from '../welcome-page-initial-page/WelcomePageInitialPage';
import Animated from 'react-native-reanimated';
import WelcomePageOnboarding from '../welcome-page-onboarding/WelcomePageOnboarding';
import { Vortex } from '@services';
import { exiting, entering } from '@utils';

type WelcomePageContentProps = {};

const WelcomePageContent: React.FC<WelcomePageContentProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [scene, setScene, sceneRef] = useBaseStateAndRef<
    'initial' | 'onboarding'
  >(
    Vortex.select('user-vortex', 'selectOnboardingLastStepCount') === undefined
      ? 'initial'
      : 'onboarding',
  );

  const onOnboardingStart = () => {
    if (sceneRef.current !== 'onboarding') {
      Vortex.dispatch('user-vortex', 'incrementOnboardingStep')(0);
      setScene('onboarding');
    }
  };

  return (
    <>
      {scene === 'initial' ? (
        <Animated.View
          exiting={exiting}
          style={styles.container}
          key={`welcome-page-content-initial`}>
          <WelcomePageInitialPage onOnboardingStart={onOnboardingStart} />
        </Animated.View>
      ) : (
        <Animated.View
          exiting={exiting}
          entering={entering}
          style={styles.container}
          key={`welcome-page-content-onboarding`}>
          <WelcomePageOnboarding />
        </Animated.View>
      )}
    </>
  );
};

export default WelcomePageContent;

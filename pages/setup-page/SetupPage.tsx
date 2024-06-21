import React from 'react';
import { useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { PageProps } from 'templates/utils';
import Animated from 'react-native-reanimated';
import SetupPageGrowScene from './components/setup-page-grow-scene/SetupPageGrowScene';
import { View } from 'react-native';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import SetupPagePaywallScene from './components/setup-page-paywall-scene/SetupPagePaywallScene';
import { Analytics, Vortex } from '@services';
import { entering, exiting } from '@utils';

type SetupPageProps = {};

const SetupPage: React.FC<SetupPageProps & PageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [sceneState, setSceneState, sceneStateRef] = useBaseStateAndRef(
    Vortex.select('user-vortex', 'selectSetupLastStepCount') ?? 0,
  );

  const onContinue = (_: number) => {
    Analytics.log(
      'setupContinueStep',
      { type: sceneStateRef.current === 0 ? 'paywall' : 'grow' },
      ['amplitude'],
    );

    if (sceneStateRef.current === 1) {
      NAVIGATION_CONTROLLER.close();
      Vortex.dispatch('user-vortex', 'incrementSetupStep')(-1);
    } else {
      setSceneState(sceneStateRef.current + 1);
      Vortex.dispatch('user-vortex', 'incrementSetupStep')(1);
    }
  };

  const onContinueScene = React.useCallback(
    (scene: number) => () => onContinue(scene),
    [],
  );

  const paywallScene = React.useMemo(() => {
    return <SetupPagePaywallScene onContinue={onContinueScene(0)} />;
  }, []);

  const growScene = React.useMemo(() => {
    return <SetupPageGrowScene onContinue={onContinueScene(1)} />;
  }, []);

  const renderSceneRecord: Record<number, JSX.Element> = {
    0: growScene,
    1: paywallScene,
  };

  const scene = React.useMemo(
    () => renderSceneRecord[sceneState],
    [sceneState],
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.content}
        entering={entering}
        exiting={exiting}
        key={`setup-page-${sceneState}`}>
        {scene}
      </Animated.View>
    </View>
  );
};

export default SetupPage;

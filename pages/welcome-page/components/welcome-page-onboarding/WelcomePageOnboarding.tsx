import React from 'react';
import { useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageOnboardingMainScene from './components/welcome-page-onboarding-main-scene/WelcomePageOnboardingMainScene';
import WelcomePageOnboardingLearnScene from './components/welcome-page-onboarding-learn-scene/WelcomePageOnboardingLearnScene';
import Animated from 'react-native-reanimated';
import WelcomePageOnboardingPickScene from './components/welcome-page-onboarding-pick-scene/WelcomePageOnboardingPickScene';
import WelcomePageOnboardingRepeatScene from './components/welcome-page-onboarding-repeat-scene/WelcomePageOnboardingRepeatScene';
import WelcomePageOnboardingTutorialScene from './components/welcome-page-onboarding-tutorial-scene/WelcomePageOnboardingTutorialScene';
import WelcomePageOnboardingReadScene from './components/welcome-page-onboarding-read-scene/WelcomePageOnboardingReadScene';
import WelcomePageOnboardingNotificationsScene from './components/welcome-page-onboarding-notifications-scene/WelcomePageOnboardingNotificationsScene';
import WelcomePageOnboardingSignupScene from './components/welcome-page-onboarding-signup-scene/WelcomePageOnboardingSignupScene';
import { Vortex } from '@services';
import { entering, exiting } from '@utils';

type WelcomePageOnboardingProps = {};

const WelcomePageOnboarding: React.FC<WelcomePageOnboardingProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [sceneState, setSceneState, sceneStateRef] = useBaseStateAndRef(
    Vortex.select('user-vortex', 'selectOnboardingLastStepCount') ?? 0,
  );

  const onContinue = (step: number) => {
    if (sceneStateRef.current !== step + 1) {
      setSceneState(step + 1);
      Vortex.dispatch('user-vortex', 'incrementOnboardingStep')(step + 1);
    }
  };

  const onContinueScene = React.useCallback(
    (scene: number) => () => onContinue(scene),
    [],
  );

  const mainScene = React.useMemo(() => {
    return <WelcomePageOnboardingMainScene onContinue={onContinueScene(0)} />;
  }, []);

  const learnScene = React.useMemo(() => {
    return <WelcomePageOnboardingLearnScene onContinue={onContinueScene(1)} />;
  }, []);

  const pickScene = React.useMemo(() => {
    return <WelcomePageOnboardingPickScene onContinue={onContinueScene(2)} />;
  }, []);

  const notificationsScene = React.useMemo(() => {
    return (
      <WelcomePageOnboardingNotificationsScene
        onContinue={onContinueScene(3)}
      />
    );
  }, []);

  const repeatScene = React.useMemo(() => {
    return <WelcomePageOnboardingRepeatScene onContinue={onContinueScene(4)} />;
  }, []);

  const tutorialScene = React.useMemo(() => {
    return (
      <WelcomePageOnboardingTutorialScene onContinue={onContinueScene(5)} />
    );
  }, []);

  const readScene = React.useMemo(() => {
    return <WelcomePageOnboardingReadScene onContinue={onContinueScene(6)} />;
  }, []);

  const signupScene = React.useMemo(() => {
    return <WelcomePageOnboardingSignupScene onContinue={onContinueScene(7)} />;
  }, []);

  const renderSceneRecord: Record<number, JSX.Element> = {
    0: mainScene,
    1: learnScene,
    2: pickScene,
    3: notificationsScene,
    4: repeatScene,
    5: tutorialScene,
    6: readScene,
    7: signupScene,
  };

  const scene = React.useMemo(
    () => renderSceneRecord[sceneState],
    [sceneState],
  );

  React.useEffect(() => {
    Vortex.dispatch('user-vortex', 'setUserStreak')(0);
  }, []);

  return (
    <Animated.View
      style={styles.container}
      entering={entering}
      exiting={exiting}
      key={`welcome-page-carousel-onboarding-scene-${sceneState}`}>
      {scene}
    </Animated.View>
  );
};

export default WelcomePageOnboarding;

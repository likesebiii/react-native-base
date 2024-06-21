import React from 'react';
import { View } from 'react-native';
import { useBaseForwardRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { TOPIC_CONTENT_QUESTIONS } from '@utils';
import TopicPageWrapper from 'pages/topic-page/TopicPage';
import WelcomePageOnboardingTip from '../welcome-page-onboarding-tip/WelcomePageOnboardingTip';
import WelcomePageOnboardingTitle from '../welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import { Analytics, Vortex } from '@services';
import WelcomePageHandLottie, {
  WelcomePageHandLottieRef,
} from 'pages/welcome-page/components/welcome-page-hand-lottie/WelcomePageHandLottie';

type WelcomePageOnboardingMainSceneProps = {
  onContinue?: () => void;
  disableLottie?: boolean;
};

const INACTIVITY_TIMEOUT = 4000;

const WelcomePageOnboardingMainScene: React.FC<
  WelcomePageOnboardingMainSceneProps
> = ({ onContinue, disableLottie = false }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const inactivityTimer = React.useRef<NodeJS.Timeout>();

  const [lottieRef, lottieForwardRef] =
    useBaseForwardRef<WelcomePageHandLottieRef>();

  const onAnswer = (_: boolean, answer: string) => {
    Analytics.log(
      'onboardingContinueStep',
      { type: 'main', mainGoal: answer },
      ['firebase', 'amplitude'],
    );

    Vortex.dispatch(
      'user-vortex',
      'changeOnboardingProps',
    )({ mainGoal: answer });
    setTimeout(() => {
      onContinue?.();
    }, 2000);
  };

  const onTapStart = () => {
    clearTimeout(inactivityTimer.current);
    lottieRef.current?.animate('stop');
  };

  React.useEffect(() => {
    Analytics.log('onboardingStep', { type: 'main' }, ['amplitude']);

    inactivityTimer.current = setTimeout(() => {
      lottieRef.current?.animate('start');
    }, INACTIVITY_TIMEOUT);
  }, []);

  return (
    <View style={styles.container}>
      <TopicPageWrapper
        style={styles.removeBackground}
        disableTopBar
        disableStreakBar
        onAnswer={onAnswer}
        footerComponent={<WelcomePageOnboardingTitle />}
        contentFromProps={[
          TOPIC_CONTENT_QUESTIONS[0],
          TOPIC_CONTENT_QUESTIONS[-1],
        ]}
        headerComponent={<WelcomePageOnboardingTip />}
        disableLivesBlocking
        disableAnalytics
        disableTopbarTap
        difficulty={1}
        lastCardEnabled={false}
        onTapStart={onTapStart}>
        {disableLottie ? undefined : (
          <WelcomePageHandLottie
            ref={lottieForwardRef}
            type={'horizontal'}
            direction={'left-right'}
            autoplay={false}
          />
        )}
      </TopicPageWrapper>
    </View>
  );
};

export default WelcomePageOnboardingMainScene;

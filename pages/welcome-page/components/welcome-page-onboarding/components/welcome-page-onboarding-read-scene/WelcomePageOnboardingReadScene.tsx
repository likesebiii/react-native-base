import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageOnboardingTitle from '../welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import { BaseText } from 'components/base/base-text/BaseText';
import WelcomePageOnboardingBottomButton from '../welcome-page-onboarding-bottom-button/WelcomePageOnboardingBottomButton';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Analytics } from '@services';

type WelcomePageOnboardingReadSceneProps = {
  onContinue?: () => void;
};

const CALENDAR_LOTTIE = require('resources/animations/calendar.json');

const WelcomePageOnboardingReadScene: React.FC<
  WelcomePageOnboardingReadSceneProps
> = ({ onContinue }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const lottieCalendarRef = React.useRef<LottieView>(null);

  React.useEffect(() => {
    Analytics.log('onboardingStep', { type: 'read' }, ['amplitude']);
  }, []);

  return (
    <View style={styles.container}>
      <WelcomePageOnboardingTitle
        illustrationType={'calendar'}
        title={'Read Daily'}
        subtitle={'It improves your mind and health'}
        disableStep
      />
      <View style={styles.textContainer}>
        <BaseText type={'texturina-16-regular'} style={styles.text}>
          {
            'Daily practice improves your vocabulary, cognition and mental health, by finding meaning between the lines.'
          }
        </BaseText>
        <Animated.View
          entering={FadeIn}
          key={`welcome-page-onboarding-read-scene-calendar-5`}>
          <LottieView
            source={CALENDAR_LOTTIE}
            ref={lottieCalendarRef}
            autoPlay
            hardwareAccelerationAndroid
            resizeMode={'cover'}
            style={styles.lottie}
            loop={true}
          />
        </Animated.View>
      </View>
      <WelcomePageOnboardingBottomButton
        onPress={onContinue}
        title={'That’s cool!'}
      />
    </View>
  );
};

export default WelcomePageOnboardingReadScene;

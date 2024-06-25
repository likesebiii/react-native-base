import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { BaseImage } from 'components/base/base-image/BaseImage';
import WelcomePageOnboardingTitle from 'pages/welcome-page/components/welcome-page-onboarding/components/welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import WelcomePageOnboardingBottomButton from 'pages/welcome-page/components/welcome-page-onboarding/components/welcome-page-onboarding-bottom-button/WelcomePageOnboardingBottomButton';
import { Analytics } from '@services';

interface SetupPageGrowSceneProps {
  onContinue?: () => void;
}

const GROW_PHOTO = require('resources/assets/grow.jpg');

const SetupPageGrowScene: React.FC<SetupPageGrowSceneProps> = ({
  onContinue,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  React.useEffect(() => {
    Analytics.log('setupStep', { type: 'paywall' }, ['amplitude']);
  }, []);

  return (
    <View style={styles.container}>
      <WelcomePageOnboardingTitle
        title={'Grow your mind'}
        subtitle={'Consistency beats intensity'}
        illustrationType={'grow'}
        disableStep
      />
      <View style={styles.topPlaceholder} />
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <BaseText type={'texturina-20-regular'} style={styles.text}>
            {
              'People who check their cards\nconsistently, on a weekly basis\n are '
            }
            <BaseText type={'texturina-18-bold'} style={styles.text}>
              {'84%'}
            </BaseText>
            {' more likely to remember\n the facts.'}
          </BaseText>
        </View>
        <View style={styles.imageContentContainer}>
          <View style={styles.imageContainer}>
            <BaseImage
              source={GROW_PHOTO}
              style={styles.image}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
      <WelcomePageOnboardingBottomButton
        title={'Let’s go'}
        onPress={onContinue}
      />
      <View style={styles.bottomPlaceholder} pointerEvents={'box-none'} />
    </View>
  );
};

export default SetupPageGrowScene;

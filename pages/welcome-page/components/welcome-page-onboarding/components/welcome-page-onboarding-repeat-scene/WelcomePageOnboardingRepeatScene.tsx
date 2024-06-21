import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageOnboardingTitle from '../welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import { BaseText } from 'components/base/base-text/BaseText';
import { BaseImage } from 'components/base/base-image/BaseImage';
import WelcomePageOnboardingBottomButton from '../welcome-page-onboarding-bottom-button/WelcomePageOnboardingBottomButton';
import { Analytics } from '@services';

type WelcomePageOnboardingRepeatSceneProps = {
  onContinue?: () => void;
};

const BRAIN_PHOTO = require('resources/assets/brain.png');

const WelcomePageOnboardingRepeatScene: React.FC<
  WelcomePageOnboardingRepeatSceneProps
> = ({ onContinue }) => {
  const { styles } = useBaseAspect(aspectStyle);

  React.useEffect(() => {
    Analytics.log('onboardingStep', { type: 'repeat' }, ['amplitude']);
  }, []);

  return (
    <View style={styles.container}>
      <WelcomePageOnboardingTitle
        title={'Repeat & Remember'}
        subtitle={'A card a day goes a long way...'}
        illustrationType={'brain'}
        disableStep
      />
      <View style={styles.topPlaceholder} />
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <BaseText type={'texturina-20-regular'} style={styles.text}>
            {
              'Studies show that if you split &\nspread information over time and\nrepeat it, you are'
            }
            <BaseText type={'texturina-18-bold'} style={styles.text}>
              {' 2.4x '}
            </BaseText>
            {'as likely to\nremember it.'}
          </BaseText>
        </View>
        <View style={styles.imageContentContainer}>
          <View style={styles.imageContainer}>
            <BaseImage
              source={BRAIN_PHOTO}
              style={styles.image}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
      <WelcomePageOnboardingBottomButton
        onPress={onContinue}
        title={'That’s cool!'}
      />
      <View style={styles.bottomPlaceholder} pointerEvents={'box-none'} />
    </View>
  );
};

export default WelcomePageOnboardingRepeatScene;

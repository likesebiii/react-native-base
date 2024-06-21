import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageOnboardingTitle from '../welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import { BaseText } from 'components/base/base-text/BaseText';
import { BaseImage } from 'components/base/base-image/BaseImage';
import WelcomePageOnboardingBottomButton from '../welcome-page-onboarding-bottom-button/WelcomePageOnboardingBottomButton';
import { Analytics } from '@services';

type WelcomePageOnboardingLearnSceneProps = {
  onContinue?: () => void;
};

const ELEPHANT_PHOTO = require('resources/assets/elephant.png');

const WelcomePageOnboardingLearnScene: React.FC<
  WelcomePageOnboardingLearnSceneProps
> = ({ onContinue }) => {
  const { styles } = useBaseAspect(aspectStyle);

  React.useEffect(() => {
    Analytics.log('onboardingStep', { type: 'learn' }, ['amplitude']);
  }, []);

  return (
    <View style={styles.container}>
      <WelcomePageOnboardingTitle
        subtitle={'Learn anything card by card'}
        step={'2'}
      />
      <View style={styles.topPlaceholder} />
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <BaseText type={'texturina-20-regular'} style={styles.text}>
            {'Splitting complex topics into fact\ncards make in '}
            <BaseText type={'texturina-18-bold'} style={styles.text}>
              {'3x'}
            </BaseText>
            {' more likely to understand and remember.'}
          </BaseText>
        </View>
        <View style={styles.imageContentContainer}>
          <View style={styles.imageContainer}>
            <BaseImage
              source={ELEPHANT_PHOTO}
              style={styles.image}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
      <WelcomePageOnboardingBottomButton onPress={onContinue} />
      <View style={styles.bottomPlaceholder} pointerEvents={'box-none'} />
    </View>
  );
};

export default WelcomePageOnboardingLearnScene;

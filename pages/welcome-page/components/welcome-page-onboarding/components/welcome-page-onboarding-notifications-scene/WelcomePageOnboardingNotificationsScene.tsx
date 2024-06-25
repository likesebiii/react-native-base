import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageOnboardingTitle from '../welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import { BaseText } from 'components/base/base-text/BaseText';
import WelcomePageOnboardingBottomButton from '../welcome-page-onboarding-bottom-button/WelcomePageOnboardingBottomButton';
import { BaseImage } from 'components/base/base-image/BaseImage';
import { Analytics, FirebaseNotifications, Vortex } from '@services';

type WelcomePageOnboardingNotificationsSceneProps = {
  onContinue?: () => void;
};

const PHONE_PHOTO = require('resources/assets/phone.png');

const WelcomePageOnboardingNotificationsScene: React.FC<
  WelcomePageOnboardingNotificationsSceneProps
> = ({ onContinue }) => {
  const { styles } = useBaseAspect(aspectStyle);

  // Used for requesting notification permissions for iOS and android.
  const requestNotificationsPermission = async ({
    onFinally,
  }: {
    onFinally: () => void;
  }) => {
    await FirebaseNotifications.requestPermissions({
      location: 'welcome-page-onboarding-notifications-scene',
    }).finally(onFinally);
  };

  const onNotifyMe = () => {
    Analytics.log(
      'onboardingContinueStep',
      { type: 'notifications', action: `notify-me` },
      ['amplitude'],
    );
    requestNotificationsPermission({
      onFinally: () => {
        Vortex.dispatch(
          'user-vortex',
          'changeOnboardingProps',
        )({ notificationsOn: true });
        setTimeout(() => onContinue?.());
      },
    });
  };

  const onIDontKnow = () => {
    Analytics.log(
      'onboardingContinueStep',
      { type: 'notifications', action: `don't-know` },
      ['amplitude'],
    );
    Vortex.dispatch(
      'user-vortex',
      'changeOnboardingProps',
    )({ notificationsOn: false });
    onContinue?.();
  };

  React.useEffect(() => {
    Analytics.log('onboardingContinueStep', { type: 'notifications' }, [
      'amplitude',
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <WelcomePageOnboardingTitle
        illustrationType={'loading'}
        title={'Getting Ready...'}
        subtitle={'In the meantime...'}
        disableStep
      />
      <View style={styles.topPlaceholder} />
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <BaseText type={'texturina-20-regular'} style={styles.text}>
            {
              'Turn on notifications to find out\n when your deck is ready and\n when new ones come out!'
            }
          </BaseText>
        </View>
        <View style={styles.imageContentContainer}>
          <View style={styles.imageContainer}>
            <BaseImage
              source={PHONE_PHOTO}
              style={styles.image}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
      <WelcomePageOnboardingBottomButton
        title={'Notify me'}
        tip={'I don’t know yet'}
        onPress={onNotifyMe}
        onTipPress={onIDontKnow}
        removeTip
      />
    </View>
  );
};

export default WelcomePageOnboardingNotificationsScene;

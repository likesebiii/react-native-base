import React from 'react';
import { View } from 'react-native';
import { aspectStyle } from './aspect';
import LottieView from 'lottie-react-native';
import { BaseText } from 'components/base/base-text/BaseText';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { Analytics, FirebaseNotifications, useSelectVortex } from '@services';
import { BaseSecondaryButton } from 'components/base/base-secondary-button/BaseSecondaryButton';
import { BATTLE_CARDS_LIMIT, getUserAchievements } from '@utils';
import { ROOT_TABS_CONTROLLER } from 'pages/root-page/components/root-page-content/RootPageContent';
import { useBaseAspect } from '@hooks';

interface GameTabEmptyProps {
  disableBeta?: boolean;
}

const SWORDS_LOTTIE = require('resources/animations/swords.json');

export const GAME_TAB: {
  enter?: () => void;
  exit?: () => void;
} = {};

const GameTabEmpty: React.FC<GameTabEmptyProps> = ({ disableBeta = true }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const lottieRef = React.useRef<LottieView>(null);

  const enter = () => {
    lottieRef.current?.play();
  };

  const exit = () => {
    lottieRef.current?.pause();
  };

  // Bind controller
  React.useEffect(() => {
    GAME_TAB.enter = enter;
    GAME_TAB.exit = exit;

    return () => {
      if (GAME_TAB.enter === enter) {
        GAME_TAB.enter = undefined;
      }

      if (GAME_TAB.exit === exit) {
        GAME_TAB.exit = undefined;
      }
    };
  }, []);

  // Used for requesting notification permissions for iOS and android.
  const requestNotificationsPermission = async ({
    onFinally,
  }: {
    onFinally?: () => void;
  }) => {
    FirebaseNotifications.requestPermissions({
      location: 'game-tab-empty',
    }).finally(onFinally);
  };

  const onScheduleMeeting = () => {
    Analytics.log(
      'tapElement',
      { location: 'game-empty-tab', element: 'share-your-thoughts' },
      ['amplitude'],
    );
    NAVIGATION_CONTROLLER.navigate('fk.FeedbackDrawer', {});
  };

  const onCollectPress = () => {
    Analytics.log(
      'tapElement',
      { location: 'game-empty-tab', element: 'collect-achievements' },
      ['amplitude'],
    );
    ROOT_TABS_CONTROLLER.changeTab?.(1);
  };

  const onNotifyMe = () => {
    Analytics.log(
      'tapElement',
      { location: 'game-empty-tab', element: 'notify-me' },
      ['amplitude'],
    );
    requestNotificationsPermission({});
  };

  const onBetaPress = () => {
    NAVIGATION_CONTROLLER.navigate('fk.GamePage', {});
  };

  // Used to constantly update this card
  useSelectVortex('user-vortex', 'selectCollectedQuestions');

  const achievements = getUserAchievements({
    filterUnlockedAchievements: true,
  });
  const arenaUnlocked = achievements.length >= BATTLE_CARDS_LIMIT;
  const title = arenaUnlocked ? 'Coming (very) Soon' : 'Battle Arena';

  return (
    <View style={styles.container}>
      <LottieView
        source={SWORDS_LOTTIE}
        ref={lottieRef}
        loop
        hardwareAccelerationAndroid
        resizeMode={'cover'}
        style={styles.lottie}
      />
      <BaseText
        style={styles.text}
        type={'texturina-34-bold'}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {title}
      </BaseText>
      {arenaUnlocked ? (
        <BaseText
          type={'texturina-20-regular'}
          numberOfLines={3}
          adjustsFontSizeToFit
          style={styles.subtitle}>
          {`1v1 battles are almost here.\nBuild your deck, sharpen your `}
          <BaseText type={'texturina-20-regular'} style={styles.lineThrough}>
            {'sword'}
          </BaseText>
          {' mind and get ready!'}
        </BaseText>
      ) : (
        <BaseText
          type={'texturina-20-regular'}
          numberOfLines={3}
          adjustsFontSizeToFit
          style={styles.subtitle}>
          {`You must collect at least `}
          <BaseText type={'texturina-18-bold'}>
            {`${BATTLE_CARDS_LIMIT} achievements `}
          </BaseText>
          {'before being allowed into the arena.'}
        </BaseText>
      )}
      <View style={styles.bottomContainer}>
        {arenaUnlocked ? (
          <BasePrimaryButton
            title={'Share your thoughts, win a 🎁'}
            onPress={onScheduleMeeting}
            containerStyle={{ paddingHorizontal: 16 }}
          />
        ) : (
          <BasePrimaryButton
            title={'Collect trophies'}
            onPress={onCollectPress}
            containerStyle={{ paddingHorizontal: 16 }}
          />
        )}
        {arenaUnlocked ? (
          <BaseSecondaryButton
            title={'Notify me 🔔'}
            onPress={onNotifyMe}
            style={styles.beta}
            titleStyle={styles.text}
          />
        ) : null}
        {disableBeta ? undefined : (
          <BasePrimaryButton
            title={'Try BETA'}
            onPress={onBetaPress}
            containerStyle={styles.beta}
          />
        )}
      </View>
    </View>
  );
};

export default GameTabEmpty;

import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { LivesSvg } from '@svgs';
import { LIVES_LIMIT, LIVES_TIMEOUT } from '@utils';
import { BaseText } from 'components/base/base-text/BaseText';
import LivesCounter from '../lives-counter/LivesCounter';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import { BaseSecondaryButton } from 'components/base/base-secondary-button/BaseSecondaryButton';
import { Analytics, useSelectVortex } from '@services';
import { NAVIGATION_CONTROLLER } from 'services/navigation';

interface LivesInfoContentProps {
  date: string;
  lives: number;
  onClose?: () => void;
}

const LivesInfoContent: React.FC<LivesInfoContentProps> = ({
  date,
  lives,
  onClose,
}) => {
  const { styles } = useBaseAspect(aspectStyle);
  const isPro = useSelectVortex('user-vortex', 'selectUserSubscriptionType');

  const onImGoodPress = () => {
    Analytics.log(
      'tapElement',
      { location: 'lives-drawer', element: 'i-m-good-close' },
      ['amplitude'],
    );
    onClose?.();
  };

  const onGetMoreLives = () => {
    Analytics.log(
      'tapElement',
      { location: 'lives-drawer', element: 'get-more-lives' },
      ['amplitude'],
    );

    const onSuccess = () => {
      NAVIGATION_CONTROLLER.navigate('fk.PaywallPage', {
        location: 'lives-drawer-info',
      });
    };

    NAVIGATION_CONTROLLER.close(onSuccess);
  };

  const onGetInTouch = () => {
    Analytics.log(
      'tapElement',
      { location: 'lives-drawer-info', element: 'get-in-touch' },
      ['amplitude'],
    );

    const onSuccess = () => {
      NAVIGATION_CONTROLLER.navigate('fk.FeedbackDrawer', {});
    };

    NAVIGATION_CONTROLLER.close(onSuccess);
  };

  const timeCount = Math.round(
    LIVES_TIMEOUT[isPro] / 60 / (isPro === 'pro' ? 1 : 60),
  );

  return (
    <>
      <View style={styles.subtitleContainer}>
        <LivesSvg height={64} width={64} />
        <View style={styles.subtitle}>
          <BaseText style={styles.error} type={'texturina-26-semi-bold'}>
            {'Your lives'}
          </BaseText>
          <BaseText
            style={styles.error}
            type={'texturina-20-regular'}>{`${lives} left`}</BaseText>
        </View>
      </View>
      <BaseText style={styles.text} type={'texturina-20-regular'}>
        {`\n\nLives are used when you get a question wrong. When you’re out, you can’t swipe cards anymore.\n
  \nThey replenish `}
        <BaseText type={'texturina-18-bold'}>{`every ${
          timeCount === 1 ? '' : `${timeCount} `
        }${isPro === 'pro' ? 'minute' : 'hour'}${
          timeCount === 1 ? '' : 's'
        }`}</BaseText>
        {` & you can carry`}
        <BaseText
          type={'texturina-18-bold'}>{` ${LIVES_LIMIT[isPro]} `}</BaseText>
        {`at a time.`}
      </BaseText>
      <LivesCounter
        lives={lives}
        date={new Date(
          new Date(date + 'Z').getTime() + 1000 * LIVES_TIMEOUT[isPro],
        )
          .toISOString()
          .slice(0, -1)}
        style={styles.lives}
      />
      <BasePrimaryButton
        title={isPro === 'pro' ? 'Get in touch' : 'Get more lives now'}
        onPress={isPro === 'pro' ? onGetInTouch : onGetMoreLives}
        containerStyle={styles.firstButton}
      />
      <BaseSecondaryButton
        title={`I'm good`}
        titleStyle={styles.text}
        style={styles.secondButton}
        onPress={onImGoodPress}
      />
    </>
  );
};

export default LivesInfoContent;

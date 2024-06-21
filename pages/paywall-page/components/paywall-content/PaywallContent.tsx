import React from 'react';
import { View } from 'react-native';
import { useBaseAspect, useBasePurchase } from '@hooks';
import { aspectStyle } from './aspect';
import { CloseSvg } from '@svgs';
import { BasePressableScale } from 'components/base/base-pressable-scale/BasePressableScale';
import Paywall7DayTrialScene from 'components/paywall/paywall-7-day-trial-scene/Paywall7DayTrialScene';
import PaywallButton from '../paywall-button/PaywallButton';
import Animated from 'react-native-reanimated';
import { PaywallLocationType } from '@types';
import { Analytics } from '@services';
import { colors } from '@theme';
import { entering, exiting } from '@utils';
import PaywallSuccess from '../paywall-success/PaywallSuccess';

interface PaywallContentProps {
  onClose?: () => void;
  location?: PaywallLocationType;
}

const PaywallContent: React.FC<PaywallContentProps> = ({
  onClose: onCloseFromProps,
  location = 'other',
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { isPurchasing, state, onPurchase, purchase } = useBasePurchase({
    location,
  });

  const subscription = purchase[0];

  const onClose = () => {
    Analytics.log('paywallAction', { location, action: 'close-press' }, [
      'amplitude',
    ]);
    onCloseFromProps?.();
  };

  const paywallSceneNormal = React.useMemo(() => {
    return (
      <>
        <Paywall7DayTrialScene
          header={
            <View style={styles.header}>
              <BasePressableScale onPress={onClose}>
                <CloseSvg height={16} fill={colors.light.text.primary} />
              </BasePressableScale>
            </View>
          }
        />
        <PaywallButton
          title={'Try it for Free'}
          onPress={onPurchase}
          disableTopText={subscription ? false : true}
          state={isPurchasing ? 'loading' : 'enabled'}
          subscription={subscription}
        />
      </>
    );
  }, [isPurchasing, subscription]);

  const paywallSceneSuccess = React.useMemo(() => {
    return <PaywallSuccess onClose={onClose} />;
  }, []);

  const renderSceneRecord: Record<'normal' | 'success', JSX.Element> = {
    normal: paywallSceneNormal,
    success: paywallSceneSuccess,
  };

  React.useEffect(() => {
    Analytics.log('enterPaywall', { location: location, type: state }, [
      'amplitude',
    ]);
  }, [state]);

  return (
    <Animated.View
      style={styles.container}
      key={`paywall-content-${state}`}
      entering={entering}
      exiting={exiting}>
      {renderSceneRecord[state]}
    </Animated.View>
  );
};

export default PaywallContent;

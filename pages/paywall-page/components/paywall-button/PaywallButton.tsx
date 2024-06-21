import React from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { changeOpacityOfRgbaColor, hexColorToRgba } from '@utils';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { BaseText } from 'components/base/base-text/BaseText';
import { SecuredSvg } from '@svgs';
import BaseTermsOfService from 'components/base/base-terms-of-service/BaseTermsOfService';
import { PurchasesPackage } from 'react-native-purchases';
import { colors } from '@theme';

type PaywallButtonProps = {
  title?: string;
  onPress?: () => void;
  topTitle?: string;
  state?: 'enabled' | 'disabled' | 'loading';
  textStyle?: StyleProp<TextStyle>;
  disableTopText?: boolean;
  disableSecured?: boolean;
  topPriceText?: string;
  priceText?: string;
  subscription?: PurchasesPackage;
};

const PaywallButton: React.FC<PaywallButtonProps> = ({
  title = 'Subscribe',
  onPress,
  state,
  textStyle,
  topTitle,
  disableSecured = false,
  disableTopText = false,
  topPriceText,
  priceText,
  subscription,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const currency = subscription?.product.currencyCode ?? 'USD';

  return (
    <View style={styles.button}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.1, 1]}
        colors={[
          changeOpacityOfRgbaColor(
            hexColorToRgba(colors[theme].main.primaryBackground),
            0.1,
          ),
          colors[theme].main.primaryBackground,
          colors[theme].main.primaryBackground,
        ]}
        style={styles.gradient}
      />
      {disableTopText ? undefined : (
        <View style={styles.topContainer}>
          <BaseText type={'texturina-14-regular'} style={styles.proSubtitle}>
            {topPriceText ?? `7-day free trial, then `}
            <BaseText type={'texturina-14-semi-bold'}>
              {`${subscription?.product.priceString ?? '$0'} per year\n`}
            </BaseText>
            {priceText ??
              `(only ${currency === 'USD' ? '$' : ''}${
                subscription?.product.price
                  ? Math.floor((subscription?.product.price / 12) * 100) / 100
                  : '0'
              }${currency === 'USD' ? '' : ` ${currency}`} per month).`}
          </BaseText>
        </View>
      )}
      {topTitle ? (
        <BaseText
          type={'texturina-20-regular'}
          style={[styles.text, textStyle, styles.topTitle]}>
          {topTitle}
        </BaseText>
      ) : undefined}
      <BasePrimaryButton title={title} onPress={onPress} state={state} />
      {disableSecured ? undefined : (
        <View style={styles.bottomContainer}>
          <View style={styles.secured}>
            <SecuredSvg width={16} />
          </View>
          <BaseText type={'jockey-16'} style={styles.text}>
            {'App Store secured. Cancel anytime.'}
          </BaseText>
        </View>
      )}
      <BaseTermsOfService />
    </View>
  );
};

export default PaywallButton;

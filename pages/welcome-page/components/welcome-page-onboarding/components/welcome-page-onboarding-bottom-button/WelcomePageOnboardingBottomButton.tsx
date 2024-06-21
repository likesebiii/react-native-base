import React from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { changeOpacityOfRgbaColor, hexColorToRgba } from '@utils';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { BaseText } from 'components/base/base-text/BaseText';
import { BasePressableScale } from 'components/base/base-pressable-scale/BasePressableScale';
import { colors } from '@theme';

type WelcomePageOnboardingBottomButtonProps = {
  title?: string;
  onPress?: () => void;
  tip?: string;
  topTitle?: string;
  state?: 'enabled' | 'disabled' | 'loading';
  removeTip?: boolean;
  textStyle?: StyleProp<TextStyle>;
  onTipPress?: () => void;
  buttonLeftComponent?: JSX.Element;
};

const WelcomePageOnboardingBottomButton: React.FC<
  WelcomePageOnboardingBottomButtonProps
> = ({
  title = 'Sounds great!',
  onPress,
  onTipPress,
  tip,
  state,
  removeTip = false,
  textStyle,
  topTitle,
  buttonLeftComponent,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  return (
    <View style={[styles.button, tip ? styles.buttonWithTip : undefined]}>
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
      {topTitle ? (
        <BaseText
          type={'texturina-20-regular'}
          style={[styles.text, textStyle, styles.topTitle]}>
          {topTitle}
        </BaseText>
      ) : undefined}
      <BasePrimaryButton
        title={title}
        onPress={onPress}
        state={state}
        leftComponent={buttonLeftComponent}
      />
      {tip ? (
        <BasePressableScale
          style={styles.textContainer}
          disabled={onTipPress === undefined}
          onPress={onTipPress}>
          <BaseText
            type={'texturina-20-regular'}
            style={[styles.text, textStyle, removeTip ? styles.marginTop : {}]}>
            {removeTip ? undefined : (
              <BaseText type={'jockey-24'} style={styles.text}>
                {'TIP: '}
              </BaseText>
            )}
            {tip}
          </BaseText>
        </BasePressableScale>
      ) : undefined}
    </View>
  );
};

export default WelcomePageOnboardingBottomButton;

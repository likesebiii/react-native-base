import React from 'react';
import { aspectStyle } from './aspect';
import {
  ColorValue,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { BaseLoadingIndicator } from 'components/base/base-loading-indicator/BaseLoadingIndicator';
import { BaseText } from '../base-text/BaseText';
import { BasePressableScale } from 'components/base/base-pressable-scale/BasePressableScale';
import { colors } from '@theme';
import { useBaseAspect } from '@hooks';
import { hexColorToRgbaArray, rgbaArrayToRgbaColor } from '@utils';

export type BaseButtonProps = {
  title?: string;
  children?: JSX.Element;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonContentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  state?: 'enabled' | 'disabled' | 'loading';
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  children,
  titleStyle,
  containerStyle,
  buttonStyle: buttonStyleFromProps,
  buttonContentStyle,
  onPress,
  state = 'enabled',
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const styleState = React.useMemo(() => {
    const internalState: { background?: ColorValue; height?: number } = {};
    const buttonStyle = StyleSheet.flatten(buttonStyleFromProps);

    internalState.background = ((state === 'disabled'
      ? styles.disabledContainer.backgroundColor
      : undefined) ??
      buttonStyle?.backgroundColor ??
      styles.container.backgroundColor) as string;

    internalState.height = ((state === 'disabled'
      ? styles.disabledContainer.height
      : undefined) ??
      buttonStyle?.height ??
      styles.container.height) as number;

    if (internalState.background) {
      const background = hexColorToRgbaArray(`${internalState.background}`);
      background[0] = Math.max(0, (background[0] - 10) % 255);
      background[1] = Math.max(0, (background[1] - 10) % 255);
      background[2] = Math.max(0, (background[2] - 10) % 255);
      background[3] = 0.8;

      return {
        borderColor: rgbaArrayToRgbaColor(background),
        height: internalState.height ?? 40,
      };
    } else {
      return undefined;
    }
  }, [state, theme]);

  return (
    <BasePressableScale
      disabled={state !== 'enabled'}
      onPress={onPress}
      containerStyle={buttonContentStyle}
      style={[
        styles.container,
        buttonStyleFromProps,
        state === 'disabled' ? styles.disabledContainer : undefined,
        styleState
          ? {
              borderWidth: styleState.height / 16,
              borderColor: styleState.borderColor,
              borderRadius: styleState.height / 4,
            }
          : {},
      ]}>
      <View style={styles.loading}>
        {state === 'loading' ? (
          <BaseLoadingIndicator
            color={colors[theme].main.inverted}
            loading={true}
          />
        ) : null}
      </View>
      <View
        style={[state === 'loading' ? styles.invisible : {}, containerStyle]}>
        {children ?? (
          <BaseText
            type={'texturina-14-semi-bold'}
            style={[
              styles.title,
              titleStyle,
              state === 'disabled' ? styles.disabledTitle : undefined,
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}>
            {title}
          </BaseText>
        )}
      </View>
    </BasePressableScale>
  );
};

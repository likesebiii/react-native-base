import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { aspectStyle } from './aspect';
import { BaseButton } from 'components/base/base-button/BaseButton';
import { BaseText, BaseTextProps } from 'components/base/base-text/BaseText';
import { useBaseAspect } from '@hooks';
import { MAX_TEXT_SIZE_MULTIPLIER } from '@utils';

type BasePrimaryButtonProps = {
  title: string;
  titleProps?: BaseTextProps;
  titleStyle?: StyleProp<TextStyle>;
  state?: 'enabled' | 'disabled' | 'loading';
  containerStyle?: StyleProp<ViewStyle>;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  onPress?: () => void;
};

export const BasePrimaryButton: React.FC<BasePrimaryButtonProps> = ({
  title,
  state = 'enabled',
  containerStyle,
  titleStyle: textStyle,
  leftComponent,
  rightComponent,
  onPress,
  titleProps,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const withComponentCheck = (
    component: JSX.Element | null | undefined,
    style: StyleProp<ViewStyle>,
  ) => {
    return component ? <View style={style}>{component}</View> : null;
  };

  return (
    <BaseButton
      onPress={onPress}
      state={state}
      buttonStyle={[styles.container, containerStyle]}
      buttonContentStyle={styles.content}>
      <View style={styles.contentContainer}>
        {withComponentCheck(leftComponent, styles.left)}
        <View style={styles.textContainer}>
          <BaseText
            numberOfLines={1}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}
            type={'texturina-20-semi-bold'}
            style={[styles.text, textStyle]}
            {...titleProps}>
            {title}
          </BaseText>
        </View>
        {withComponentCheck(rightComponent, styles.right)}
      </View>
    </BaseButton>
  );
};

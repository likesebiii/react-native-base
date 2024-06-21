import { TextType, typography } from '@theme';
import { MAX_TEXT_SIZE_MULTIPLIER } from '@utils';
import React from 'react';
import { Platform, Text, TextProps } from 'react-native';

export type BaseTextProps = TextProps & {
  type?: TextType;
};

export const BaseText: React.FC<BaseTextProps> = ({
  children,
  type = 'texturina-14-regular',
  ...textProps
}: BaseTextProps) => {
  const textTypography =
    Platform.OS === 'android' ? typography['scale'] : typography['noscale'];

  return (
    <Text
      maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}
      {...textProps}
      style={[textTypography[type], textProps.style]}>
      {children}
    </Text>
  );
};

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing, typography } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      backgroundColor: colors[theme].error,
      borderLeftColor: colors[theme].error,
      borderRadius: 12,
    },
    content: {
      paddingHorizontal: sizing.m,
      backgroundColor: colors[theme].main.primaryBackground,
    },
    title: {
      ...typography['noscale']['texturina-18-semi-bold'],
      color: colors.light.text.primary,
    },
    subtitle: {
      ...typography['noscale']['texturina-16-regular'],
      color: colors.light.text.secondary,
    },
  });
};

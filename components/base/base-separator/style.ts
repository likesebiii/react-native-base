import { ViewStyle, StyleSheet } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  separator: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    separator: {
      backgroundColor: colors[theme].main.separator,
      height: 1,
      marginHorizontal: sizing.l,
    },
  });
};

import { TextStyle, StyleSheet } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  text: TextStyle;
  underline: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    text: {
      color: colors[theme].text.secondary,
      marginTop: sizing.m,
      textAlign: 'center',
    },
    underline: {
      textDecorationLine: 'underline',
    },
  });
};

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  cardContent: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    cardContent: {
      backgroundColor: '#F6F4EF',
    },
    textContainer: {
      height: '100%',
      justifyContent: 'center',
    },
    title: {
      color: colors[theme].text.primary,
      textAlign: 'left',
    },
    subtitle: {
      color: colors[theme].text.primary,
      marginTop: sizing.m,
      textAlign: 'left',
      lineHeight: undefined,
    },
  });
};

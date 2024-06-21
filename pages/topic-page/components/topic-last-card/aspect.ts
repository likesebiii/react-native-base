import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { getCardHeight } from 'pages/topic-page/constants';

type AspectStyle = {
  cardContent: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    cardContent: {
      backgroundColor: '#F6F4EF',
      height: getCardHeight(screenHeight) + getCardHeight(screenHeight) * 0.06,
      width:
        getCardHeight(screenHeight) * 0.695 +
        getCardHeight(screenHeight) * 0.06,
      borderRadius: getCardHeight(screenHeight) * 0.04,
      padding: getCardHeight(screenHeight) * 0.08,
      paddingTop: getCardHeight(screenHeight) * 0.1,
    },
    textContainer: {
      height: '100%',
      justifyContent: 'center',
    },
    title: {
      color: colors[theme].text.primary,
      textAlign: 'center',
    },
    subtitle: {
      color: colors[theme].text.primary,
      marginTop: sizing.xl,
      textAlign: 'center',
      lineHeight: undefined,
      bottom: 16,
    },
  });
};

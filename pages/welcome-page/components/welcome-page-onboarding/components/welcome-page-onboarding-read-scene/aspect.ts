import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING } from '@utils';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  textContainer: ViewStyle;
  text: TextStyle;
  lottie: ViewStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (_: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      container: {
        position: 'absolute',
        top: -BASE_TOP_PADDING,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
      },
      textContainer: {
        paddingHorizontal: 24,
        marginTop: sizing.m,
        alignItems: 'center',
      },
      text: {
        color: colors[theme].text.primary,
        textAlign: 'center',
      },
      lottie: { width: screenWidth * 0.7, height: screenWidth * 0.7 },
    });
  };

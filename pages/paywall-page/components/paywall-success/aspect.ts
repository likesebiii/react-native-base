import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING } from '@utils';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  welcomeHeader: ViewStyle;
  header: ViewStyle;
  center: ViewStyle;
  image: ImageStyle;
  successText: TextStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (_: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      container: {},
      welcomeHeader: {
        position: 'absolute',
        top: 3,
        left: 0,
        right: 0,
        bottom: 0,
      },
      header: {
        position: 'absolute',
        right: sizing.l,
        top: BASE_TOP_PADDING,
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: screenWidth * 0.6,
        height: screenWidth * 0.6,
        borderRadius: 16,
      },
      successText: {
        paddingHorizontal: 32,
        color: colors[theme].text.primary,
        textAlign: 'center',
        marginTop: 24,
      },
    });
  };

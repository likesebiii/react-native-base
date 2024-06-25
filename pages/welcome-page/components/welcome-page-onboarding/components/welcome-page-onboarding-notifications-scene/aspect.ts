import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING } from '@utils';
import { colors, sizing } from '@theme';
import { interpolate } from 'react-native-reanimated';

type AspectStyle = {
  container: ViewStyle;
  image: ImageStyle;
  imageContentContainer: ViewStyle;
  imageContainer: ViewStyle;
  mainContainer: ViewStyle;
  textContainer: ViewStyle;
  text: TextStyle;
  topPlaceholder: ViewStyle;
  bottomPlaceholder: ViewStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (screenHeight: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      container: {
        position: 'absolute',
        top: -BASE_TOP_PADDING,
        bottom: 0,
        left: 0,
        right: 0,
      },
      imageContentContainer: {
        flex: 3,
      },
      textContainer: {
        top: sizing.s,
        flex: 1,
        justifyContent: 'center',
      },
      image: {
        width: screenWidth - 48,
        height: (screenWidth - 48) * 1.64,
        borderRadius: 16,
      },
      imageContainer: {
        height: 500,
        marginTop: sizing.m,
        borderRadius: 16,
        backgroundColor: colors[theme].main.primaryBackground,
      },
      mainContainer: {
        paddingHorizontal: 24,
        flex: 1,
      },

      text: {
        color: colors[theme].text.primary,
        textAlign: 'center',
      },
      topPlaceholder: {
        height: 130,
        top: -sizing.xl,
        marginBottom: -sizing.xl,
      },
      bottomPlaceholder: {
        height: interpolate(screenHeight, [667, 852], [90, 110]),
        opacity: 0.5,
      },
    });
  };

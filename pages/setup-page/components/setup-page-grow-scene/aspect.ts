import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ThemeType } from '@types';
import {
  BASE_TOP_PADDING,
  changeOpacityOfRgbaColor,
  hexColorToRgba,
} from '@utils';
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
        marginTop: BASE_TOP_PADDING + sizing.xl,
        top: -BASE_TOP_PADDING,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
      },
      image: {
        width: screenWidth - 48,
        height: screenWidth - 48,
        borderRadius: 16,
      },
      imageContentContainer: {
        flex: 1.5,
        justifyContent: 'center',
      },
      imageContainer: {
        shadowColor:
          Platform.OS === 'ios'
            ? '#000000'
            : changeOpacityOfRgbaColor(hexColorToRgba('#000000'), 0.4),
        borderRadius: 16,
        backgroundColor: colors[theme].main.primaryBackground,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
      mainContainer: {
        paddingHorizontal: 24,
        flex: 1,
      },
      textContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
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

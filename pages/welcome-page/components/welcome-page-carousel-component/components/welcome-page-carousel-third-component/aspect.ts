import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ThemeType } from '@types';
import { interpolate } from 'react-native-reanimated';
import { colors, sizing } from '@theme';
import { BASE_BOTTOM_PADDING, BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  textContainer: ViewStyle;
  text: TextStyle;
  firstImage: ViewStyle;
  secondImage: ViewStyle;
  image: ImageStyle;
  firstContainer: ViewStyle;
  firstCard: ViewStyle;
  secondContainer: ViewStyle;
  secondCard: ViewStyle;
  vsContainer: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => (screenHeight: number) => {
  const CONTENT_HEIGHT =
    screenHeight -
    86 -
    BASE_BOTTOM_PADDING -
    2 * sizing.m -
    BASE_TOP_PADDING +
    sizing.xl -
    48 -
    24 -
    28 -
    (Platform.OS === 'android' ? 16 : 0);
  const CARD_HEIGHT =
    CONTENT_HEIGHT * interpolate(screenHeight, [667, 852], [0.35, 0.4]);

  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      height: CARD_HEIGHT,
      width: '100%',
      alignItems: 'center',
      left: CARD_HEIGHT * 0.15,
      marginTop: sizing.xl,
    },
    firstContainer: {
      position: 'absolute',
      zIndex: 3,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    textContainer: {
      position: 'absolute',
      bottom: 8,
      left: 0,
      right: 0,
    },
    text: {
      textAlign: 'center',
      color: colors[theme].text.primary,
      paddingHorizontal: 42,
    },
    firstImage: {
      backgroundColor: colors[theme].main.primaryBackground,
      width: 54,
      height: 54,
      borderRadius: 30,
      left: interpolate(screenHeight, [667, 852], [210, 250]),
      top: CARD_HEIGHT * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondImage: {
      backgroundColor: colors[theme].main.primaryBackground,
      width: 54,
      height: 54,
      borderRadius: 30,
      left: interpolate(screenHeight, [667, 852], [110, 85]),
      top: CARD_HEIGHT * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    firstCard: { zIndex: 2, transform: [{ rotate: '25deg' }] },
    secondContainer: {
      position: 'absolute',
      top: CARD_HEIGHT * 0.6,
      height: CARD_HEIGHT,
      right: CARD_HEIGHT * 0.15,
      width: '100%',
      alignItems: 'center',
      marginTop: sizing.m,
    },
    secondCard: { zIndex: 2, transform: [{ rotate: '-25deg' }] },
    vsContainer: {
      position: 'absolute',
      top: CARD_HEIGHT * 0.8,
      zIndex: 4,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
  });
};

import { Platform, StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';
import { BASE_BOTTOM_PADDING, BASE_TOP_PADDING } from '@utils';
import { interpolate } from 'react-native-reanimated';

type AspectStyle = {
  container: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (screenHeight: number) => {
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
    48 -
    (Platform.OS === 'android' ? 16 : 0);
  const CARD_HEIGHT = CONTENT_HEIGHT * 0.2;
  const SCALE = interpolate(screenHeight, [667, 759, 852], [0.95, 1.1, 1.2]);

  return StyleSheet.create<AspectStyle>({
    container: {
      height: SCALE * CARD_HEIGHT,
      width: SCALE * CARD_HEIGHT * 0.71,
      transform: [{ scale: SCALE }],
    },
  });
};

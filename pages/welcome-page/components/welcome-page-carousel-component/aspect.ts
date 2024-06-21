import { Platform, StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';
import { BASE_BOTTOM_PADDING, BASE_TOP_PADDING } from '@utils';

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
    (Platform.OS === 'android' ? 16 : 0);

  return StyleSheet.create<AspectStyle>({
    container: {
      height: CONTENT_HEIGHT - 40,
      width: '100%',
    },
  });
};

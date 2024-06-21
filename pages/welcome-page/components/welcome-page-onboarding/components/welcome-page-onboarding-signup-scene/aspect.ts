import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_PADDING, BASE_TOP_PADDING } from '@utils';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  removeBackground: ViewStyle;
  text: TextStyle;
  textContainer: ViewStyle;
  gradient: ViewStyle;
  bottomContainer: ViewStyle;
  cardTextContainer: ViewStyle;
  skip: ViewStyle;
  buttons: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      top: -BASE_TOP_PADDING,
      bottom: 0,
      left: 0,
      right: 0,
    },
    removeBackground: { backgroundColor: undefined },
    text: {
      color: colors.light.text.primary,
      paddingHorizontal: 32,
      textAlign: 'center',
    },
    textContainer: {
      position: 'absolute',
    },
    cardTextContainer: { marginBottom: 24 },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: BASE_BOTTOM_PADDING,
      left: 0,
      right: 0,
      paddingTop: 48,
    },
    skip: {
      position: 'absolute',
      top: BASE_TOP_PADDING - 24,
      right: 32,
      zIndex: 2,
    },
    buttons: { marginHorizontal: 24 },
  });
};

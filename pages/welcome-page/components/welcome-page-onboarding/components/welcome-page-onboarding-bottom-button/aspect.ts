import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { interpolate } from 'react-native-reanimated';

type AspectStyle = {
  container: ViewStyle;
  button: ViewStyle;
  buttonWithTip: ViewStyle;
  gradient: ViewStyle;
  text: TextStyle;
  textContainer: ViewStyle;
  topTitle: TextStyle;
  marginTop: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      zIndex: 2,
    },
    button: {
      position: 'absolute',
      bottom: 0,
      paddingBottom: interpolate(screenHeight, [667, 852], [30, 50]),
      paddingTop: sizing.s,
      left: 0,
      right: 0,
      justifyContent: 'center',
      zIndex: 2,
    },
    buttonWithTip: {
      paddingBottom: interpolate(screenHeight, [667, 852], [10, 30]),
    },
    gradient: {
      zIndex: -1,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
    text: { color: colors[theme].text.primary },
    textContainer: { marginTop: 8, alignItems: 'center' },
    topTitle: { marginBottom: 12 },
    marginTop: { marginTop: 8 },
  });
};

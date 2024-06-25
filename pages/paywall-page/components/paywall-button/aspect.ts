import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { interpolate } from 'react-native-reanimated';

type AspectStyle = {
  container: ViewStyle;
  button: ViewStyle;
  gradient: ViewStyle;
  text: TextStyle;
  topTitle: TextStyle;
  marginTop: ViewStyle;
  proSubtitle: TextStyle;
  proTitle: TextStyle;
  topContainer: ViewStyle;
  bottomContainer: ViewStyle;
  secured: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    button: {
      position: 'absolute',
      bottom: 0,
      paddingBottom: interpolate(screenHeight, [667, 852], [10, 30]),
      paddingTop: sizing.s,
      left: 0,
      right: 0,
      justifyContent: 'center',
      zIndex: 2,
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
    topTitle: {
      marginBottom: 12,
    },
    marginTop: { marginTop: 8 },
    proSubtitle: {
      paddingHorizontal: 32,
      marginTop: 4,
      color: colors[theme].text.primary,
      marginBottom: sizing.s,
      textAlign: 'center',
    },
    proTitle: {
      marginTop: 4,
      color: colors[theme].text.primary,
    },
    topContainer: { justifyContent: 'center', alignItems: 'center' },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: sizing.m,
    },
    secured: { marginRight: sizing.xs },
  });
};

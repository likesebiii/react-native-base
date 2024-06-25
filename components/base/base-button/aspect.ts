import { border, colors, sizing } from '@theme';
import { ThemeType } from '@types';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type AspectStyle = {
  container: ViewStyle;
  title: TextStyle;
  disabledContainer: ViewStyle;
  disabledTitle: TextStyle;
  loading: ViewStyle;
  invisible: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      backgroundColor: colors[theme].text.primary,
      paddingVertical: sizing.xs,
      paddingHorizontal: sizing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: border.s,
      alignSelf: 'center',
    },
    disabledContainer: {
      backgroundColor: colors[theme].text.disabled,
    },
    title: {
      color: colors[theme].main.inverted,
    },
    loading: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    disabledTitle: {
      color: colors[theme].main.inverted,
    },
    invisible: {
      opacity: 0,
    },
  });
};

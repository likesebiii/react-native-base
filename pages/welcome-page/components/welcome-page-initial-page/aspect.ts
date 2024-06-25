import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_PADDING, BASE_TOP_PADDING } from '@utils';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  title: TextStyle;
  bottomContainer: ViewStyle;
  button: ViewStyle;
  bottomText: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      marginTop: BASE_TOP_PADDING + sizing.xl,
      alignItems: 'center',
      flex: 1,
    },
    title: { color: colors[theme].text.primary },
    bottomContainer: {
      position: 'absolute',
      bottom: BASE_BOTTOM_PADDING,
      alignItems: 'center',
    },
    button: { backgroundColor: colors[theme].text.primary },
    bottomText: {
      color: colors[theme].text.primary,
      marginTop: sizing.s,
    },
  });
};

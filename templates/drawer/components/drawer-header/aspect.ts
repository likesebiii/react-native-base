import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  padding: ViewStyle;
  text: TextStyle;
  separator: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    padding: {
      paddingVertical: sizing.l,
    },
    text: {
      color: colors[theme].text.primary,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].main.separator,
    },
  });
};

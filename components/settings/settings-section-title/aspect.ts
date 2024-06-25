import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  margin: ViewStyle;
  title: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    margin: { marginTop: 48 },
    title: {
      color: colors[theme].text.primary,
      paddingHorizontal: sizing.l,
    },
  });
};

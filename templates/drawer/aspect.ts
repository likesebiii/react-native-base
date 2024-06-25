import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  bottomSheet: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flex: 1,
    },
    titleContainer: {
      marginTop: sizing.s,
      marginBottom: sizing.s,
    },
    title: {
      color: colors[theme].text.primary,
      marginRight: sizing.xxl,
    },
    bottomSheet: {
      paddingTop: -32,
    },
  });
};

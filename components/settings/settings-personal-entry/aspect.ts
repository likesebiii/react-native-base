import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { ThemeType } from '@types';
import { sizing, colors } from '@theme';

type AspectStyle = {
  title: TextStyle;
  row: ViewStyle;
  value: TextStyle;
  container: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    title: {
      color: colors[theme].text.primary,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: sizing.m,
      paddingHorizontal: sizing.l,
    },
    value: {
      marginRight: sizing.s,
      color: colors[theme].text.primary,
      textAlign: 'right',
    },
  });
};

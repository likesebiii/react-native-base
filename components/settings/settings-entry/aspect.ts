import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  border: ViewStyle;
  optionContainer: ViewStyle;
  option: TextStyle;
  title: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    option: {
      color: colors[theme].text.primary,
      textTransform: 'capitalize',
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    border: {
      borderBottomColor: colors[theme].main.separator,
      borderBottomWidth: 1,
      marginHorizontal: sizing.l,
    },
    optionContainer: {
      paddingVertical: sizing.m,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};

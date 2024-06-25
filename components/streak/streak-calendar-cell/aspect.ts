import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  filled: ViewStyle;
  empty: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    filled: {
      position: 'absolute',
      right: 0,
      backgroundColor: '#FFDA03',
      justifyContent: 'center',
      alignItems: 'center',
    },
    empty: {
      position: 'absolute',
      right: 0,
      left: 0,
      backgroundColor: colors[theme].main.separator,
    },
  });
};

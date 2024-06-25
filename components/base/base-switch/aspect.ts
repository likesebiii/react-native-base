import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  innerButton: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      width: 54,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
    },
    innerButton: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: colors[theme].main.primaryBackground,
    },
  });
};

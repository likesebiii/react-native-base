import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      backgroundColor: colors[theme].main.primaryBackground,
    },
  });
};

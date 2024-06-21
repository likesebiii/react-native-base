import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  absoluteView: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flex: 1,
      backgroundColor: colors[theme].main.primaryBackground,
    },
    absoluteView: {
      ...StyleSheet.absoluteFillObject,
    },
  });
};
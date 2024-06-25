import { ViewStyle, StyleSheet } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  svg: ViewStyle;
  button: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    button: {},
    svg: {
      alignItems: 'center',
    },
  });
};

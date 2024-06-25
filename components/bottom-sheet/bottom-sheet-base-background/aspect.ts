import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  container: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      backgroundColor: '#000000',
      height: '100%',
    },
  });
};

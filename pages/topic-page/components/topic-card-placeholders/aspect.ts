import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  container: ViewStyle;
  firstPlaceholder: ViewStyle;
  secondPlaceholder: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    firstPlaceholder: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 0,
      justifyContent: 'center',
    },
    secondPlaceholder: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 1,
      justifyContent: 'center',
    },
  });
};

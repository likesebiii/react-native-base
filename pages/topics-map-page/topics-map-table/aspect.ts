import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  container: ViewStyle;
  card: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      height: screenHeight,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    card: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

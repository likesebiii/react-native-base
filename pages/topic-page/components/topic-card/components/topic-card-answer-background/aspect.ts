import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  container: ViewStyle;
  wrongAnswer: ViewStyle;
  correctAnswer: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    wrongAnswer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 16,
      backgroundColor: '#B3000C',
    },
    correctAnswer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 16,
      backgroundColor: '#238823',
    },
  });
};

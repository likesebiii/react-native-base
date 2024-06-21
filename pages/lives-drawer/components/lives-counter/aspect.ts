import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  counterStyle: TextStyle;
  timeMeasurement: TextStyle;
  text: TextStyle;
  bottomText: TextStyle;
  counter: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 32,
    },
    counterStyle: {
      fontSize: 32,
      lineHeight: 40,
      paddingBottom: 20,
    },
    timeMeasurement: {
      textTransform: 'uppercase',
      top: 4,
      fontSize: 20,
      lineHeight: 24,
      color: '#D74141',
    },
    text: {
      height: 50,
      paddingBottom: 20,
      width: 40,
      color: '#D74141',
    },
    bottomText: {
      marginTop: 8,
      color: '#D74141',
      textAlign: 'center',
    },
    counter: { marginBottom: sizing.m },
  });
};

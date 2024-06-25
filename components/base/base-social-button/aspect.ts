import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  appleContainer: ViewStyle;
  googleContainer: ViewStyle;
  textContainer: ViewStyle;
  emailContainer: ViewStyle;
  row: ViewStyle;
  appleText: TextStyle;
  googleText: TextStyle;
  emailText: TextStyle;
  capitalize: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      height: 40,
      width: '100%',
    },
    appleContainer: { backgroundColor: '#333333' },
    googleContainer: { backgroundColor: '#4285F4' },
    emailContainer: { backgroundColor: colors[theme].text.primary },
    textContainer: { marginLeft: sizing.m },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appleText: { color: '#FFFFFF' },
    googleText: { color: '#FFFFFF' },
    emailText: { color: '#FFFFFF' },
    capitalize: { textTransform: 'capitalize' },
  });
};

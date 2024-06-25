import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  textContainer: ViewStyle;
  text: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      width: '100%',
      alignItems: 'center',
    },
    textContainer: {
      position: 'absolute',
      bottom: 8,
      left: 0,
      right: 0,
    },
    text: {
      textAlign: 'center',
      color: colors[theme].text.primary,
      paddingHorizontal: 42,
    },
  });
};

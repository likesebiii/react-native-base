import { colors } from '@theme';
import { ThemeType } from '@types';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type AspectStyle = {
  container: ViewStyle;
  text: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    text: {
      color: colors[theme].text.primary,
      alignSelf: 'center',
    },
  });
};

import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  button: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    button: { marginTop: sizing.xl },
  });
};

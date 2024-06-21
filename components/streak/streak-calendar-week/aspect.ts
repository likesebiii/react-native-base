import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  container: ViewStyle;
  margin: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: { flexDirection: 'row' },
    margin: { marginLeft: 6 },
  });
};

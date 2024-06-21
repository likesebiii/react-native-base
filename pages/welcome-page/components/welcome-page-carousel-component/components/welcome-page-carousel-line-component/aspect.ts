import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  component: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: { flexDirection: 'row' },
    component: { marginLeft: sizing.m },
  });
};

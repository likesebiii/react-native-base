import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  sectionList: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    container: { backgroundColor: colors[theme].main.primaryBackground },
    sectionList: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  });
};

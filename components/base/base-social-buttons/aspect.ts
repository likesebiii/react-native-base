import { ViewStyle, StyleSheet } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  top: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      width: '100%',
    },
    top: { marginTop: sizing.xs },
  });
};

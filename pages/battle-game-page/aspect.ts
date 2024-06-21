import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      paddingTop: BASE_TOP_PADDING,
      paddingHorizontal: 24,
    },
  });
};

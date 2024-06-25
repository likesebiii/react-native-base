import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  content: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    content: {
      paddingHorizontal: 24,
      paddingBottom: BASE_BOTTOM_PADDING,
    },
  });
};

import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_BAR_HEIGHT, BASE_TOP_PADDING } from '@utils';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  list: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      backgroundColor: colors[theme].main.primaryBackground,
      paddingHorizontal: 24,
    },
    list: {
      paddingTop: BASE_TOP_PADDING,
      paddingBottom: BASE_BOTTOM_BAR_HEIGHT,
    },
  });
};

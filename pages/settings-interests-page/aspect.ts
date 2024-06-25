import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING, BASE_BOTTOM_BAR_HEIGHT } from '@utils';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  list: ViewStyle;
  listStyle: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: { backgroundColor: colors[theme].main.primaryBackground },
    list: { top: 0 },
    listStyle: {
      paddingTop: BASE_TOP_PADDING,
      paddingBottom: BASE_BOTTOM_BAR_HEIGHT,
    },
  });
};

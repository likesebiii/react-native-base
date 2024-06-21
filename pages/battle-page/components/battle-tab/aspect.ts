import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING, BASE_BOTTOM_BAR_HEIGHT } from '@utils';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors[theme].main.primaryBackground,
      overflow: 'hidden',
    },
    scrollView: {
      paddingTop: BASE_TOP_PADDING,
      paddingHorizontal: 24,
    },
    scrollViewContent: {
      paddingBottom: BASE_BOTTOM_BAR_HEIGHT + 42 + 64 + 24 + 24,
    },
  });
};

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { BASE_TOP_PADDING, BASE_BOTTOM_BAR_HEIGHT } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  content: ViewStyle;
  text: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      backgroundColor: colors[theme].main.primaryBackground,
    },
    content: {
      paddingTop: BASE_TOP_PADDING,
      paddingBottom: BASE_BOTTOM_BAR_HEIGHT + sizing.m,
    },
    text: {
      color: colors[theme].text.primary,
      textTransform: 'capitalize',
    },
  });
};

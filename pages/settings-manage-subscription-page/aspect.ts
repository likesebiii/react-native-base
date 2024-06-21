import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_BAR_HEIGHT, BASE_TOP_PADDING } from '@utils';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  list: ViewStyle;
  text: TextStyle;
  secondaryText: TextStyle;
  marginTop: ViewStyle;
  textMargin: ViewStyle;
  padding: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: { backgroundColor: colors[theme].main.primaryBackground },
    list: {
      paddingTop: BASE_TOP_PADDING,
      paddingBottom: BASE_BOTTOM_BAR_HEIGHT,
    },
    text: {
      color: colors.light.text.primary,
      paddingHorizontal: 20,
    },
    secondaryText: {
      color: colors[theme].text.primary,
      paddingHorizontal: 20,
    },
    marginTop: { marginTop: 16 },
    textMargin: { marginTop: 24 },
    padding: { paddingBottom: 200 },
  });
};

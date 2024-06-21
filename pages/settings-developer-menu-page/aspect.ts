import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_BAR_HEIGHT, BASE_TOP_PADDING } from '@utils';
import { colors, sizing } from '@theme';

type AspectStyle = {
  text: TextStyle;
  container: ViewStyle;
  separator: ViewStyle;
  list: ViewStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (_: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      text: {
        color: colors[theme].text.primary,
        textTransform: 'capitalize',
      },
      container: {
        backgroundColor: colors[theme].main.primaryBackground,
      },
      separator: {
        width: screenWidth,
        height: 1,
        backgroundColor: colors[theme].main.separator,
        marginVertical: sizing.l,
        marginHorizontal: -sizing.l,
      },
      list: {
        paddingTop: BASE_TOP_PADDING,
        paddingBottom: BASE_BOTTOM_BAR_HEIGHT,
      },
    });
  };

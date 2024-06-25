import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { Dimensions } from '@services';

const BASE_BUTTON_HEIGHT = 54;

type AspectStyle = {
  container: ViewStyle;
  content: ViewStyle;
  contentContainer: ViewStyle;
  text: TextStyle;
  textContainer: ViewStyle;
  left: ViewStyle;
  right: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: BASE_BUTTON_HEIGHT,
      borderRadius: BASE_BUTTON_HEIGHT / 4,
      width: Dimensions.get('width') - 2 * sizing.xl,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      height: BASE_BUTTON_HEIGHT,
    },
    contentContainer: {
      flexDirection: 'row',
      paddingHorizontal: sizing.xl,
      alignItems: 'center',
    },
    textContainer: {
      flexShrink: 1,
    },
    text: {
      color: colors[theme].main.inverted,
    },
    left: {
      marginRight: sizing.xs,
    },
    right: {
      marginLeft: sizing.xs,
    },
  });
};

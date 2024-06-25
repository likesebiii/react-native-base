import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing, colors } from '@theme';
import { BASE_BOTTOM_BAR_HEIGHT } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  mainContainer: ViewStyle;
  title: TextStyle;
  button: ViewStyle;
  right: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2001,
      height: BASE_BOTTOM_BAR_HEIGHT,
    },
    mainContainer: {
      top: -2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: sizing.xl - 2,
    },
    title: {
      color: colors[theme].text.primary,
      marginRight: sizing.xxl,
    },
    button: {
      marginRight: sizing.xs,
    },
    right: {
      position: 'absolute',
      right: sizing.l,
    },
  });
};

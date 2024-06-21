import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_PADDING } from '@utils';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  cardsContainer: ViewStyle;
  icon: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      backgroundColor: colors[theme].main.primaryBackground,
      overflow: 'hidden',
    },
    cardsContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      position: 'absolute',
      bottom: BASE_BOTTOM_PADDING - 16,
      left: 0,
      right: 0,
      paddingHorizontal: 12,
      marginRight: sizing.m,
    },
  });
};

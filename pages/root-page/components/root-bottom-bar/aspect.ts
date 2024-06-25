import { ThemeType } from '@types';
import { sizing } from '@theme';
import { BASE_BOTTOM_BAR_HEIGHT } from '@utils';
import { ViewStyle, StyleSheet } from 'react-native';

type AspectStyle = {
  container: ViewStyle;
  content: ViewStyle;
  item: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      zIndex: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    content: {
      paddingBottom: sizing.m,
      paddingHorizontal: sizing.m,
      height: BASE_BOTTOM_BAR_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
    },
    item: {
      flex: 1,
    },
  });
};

import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  removeBackground: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      top: -BASE_TOP_PADDING,
      bottom: 0,
      left: 0,
      right: 0,
    },
    removeBackground: { backgroundColor: undefined },
  });
};

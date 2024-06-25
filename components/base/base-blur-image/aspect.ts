import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';

type AspectStyle = {
  emptyImage: ViewStyle;
  imageContainer: ViewStyle;
  blurhashContainer: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    imageContainer: {
      alignSelf: 'center',
      width: '100%',
    },
    blurhashContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    emptyImage: {
      height: sizing.l,
    },
  });
};

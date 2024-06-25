import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';
import { BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  header: ViewStyle;
  center: ViewStyle;
  image: ImageStyle;
};

export const aspectStyle =
  (_: ThemeType) => (_: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
      },
      header: {
        position: 'absolute',
        right: sizing.l,
        top: BASE_TOP_PADDING,
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: screenWidth * 0.6,
        height: screenWidth * 0.6,
        borderRadius: 16,
      },
    });
  };

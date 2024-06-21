import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { getCardHeight } from 'pages/topic-page/constants';

type AspectStyle = {
  container: ViewStyle;
  horizontal: ViewStyle;
  vertical: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      bottom: (screenHeight - getCardHeight(screenHeight)) / 2,
      zIndex: 2000,
    },
    horizontal: { width: 180, height: 90 },
    vertical: { width: 80, height: 160 },
  });
};

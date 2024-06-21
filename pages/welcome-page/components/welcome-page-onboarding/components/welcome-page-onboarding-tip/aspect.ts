import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { interpolate } from 'react-native-reanimated';
import { getCardHeight } from 'pages/topic-page/constants';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  text: TextStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (screenHeight: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      container: {
        position: 'absolute',
        bottom: interpolate(screenHeight, [667, 852], [30, 50]),
        paddingLeft: (screenWidth - getCardHeight(screenHeight) * 0.71) / 2,
        paddingRight: 48,
        left: 0,
        right: 0,
        justifyContent: 'center',
      },
      text: { color: colors[theme].text.primary },
    });
  };

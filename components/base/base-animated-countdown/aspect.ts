import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, typography } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  text: TextStyle;
  content: ViewStyle;
  dots: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      overflow: 'hidden',
    },
    text: {
      ...typography['noscale']['texturina-26-bold'],
      color: colors[theme].text.primary,
    },
    content: { position: 'absolute' },
    dots: {
      right: 0,
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
  });
};

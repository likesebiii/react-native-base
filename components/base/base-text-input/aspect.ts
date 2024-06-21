import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, typography } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  text: TextStyle;
  border: ViewStyle;
  icon: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      height: 54,
      paddingRight: 24,
    },
    text: {
      ...typography['noscale']['texturina-16-regular'],
      lineHeight: undefined,
      paddingHorizontal: 12,
      paddingBottom: 12,
      paddingTop: 12,
      color: colors[theme].text.primary,
    },
    border: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 12,
    },
    icon: {
      position: 'absolute',
      right: 12,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      zIndex: 2,
    },
  });
};

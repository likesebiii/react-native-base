import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { ThemeType } from 'types';
import { colors } from '@theme';

type AspectStyle = {
  text: TextStyle;
  error: TextStyle;
  subtitle: ViewStyle;
  subtitleContainer: ViewStyle;
  lives: ViewStyle;
  firstButton: ViewStyle;
  secondButton: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    text: { color: colors[theme].text.primary },
    error: { color: '#D74141' },
    subtitle: { justifyContent: 'center', marginLeft: 12 },
    subtitleContainer: { flexDirection: 'row', width: '100%', left: -8 },
    lives: { marginBottom: 16 },
    firstButton: { marginTop: 12 },
    secondButton: { marginTop: 16 },
  });
};

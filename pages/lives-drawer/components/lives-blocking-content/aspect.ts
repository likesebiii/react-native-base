import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { ThemeType } from 'types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  text: TextStyle;
  error: TextStyle;
  subtitle: ViewStyle;
  subtitleContainer: ViewStyle;
  livesEmpty: ViewStyle;
  lives: ViewStyle;
  marginTop: ViewStyle;
  notify: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    text: {
      color: colors[theme].text.primary,
      textAlign: 'center',
    },
    error: { color: '#D74141', textAlign: 'center' },
    subtitle: { justifyContent: 'center', marginLeft: 12 },
    subtitleContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 16,
    },
    livesEmpty: { marginTop: 20 },
    lives: { marginBottom: 24 },
    marginTop: { marginTop: sizing.xl },
    notify: { marginTop: 24 },
  });
};

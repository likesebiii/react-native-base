import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { changeOpacityOfRgbaColor, hexColorToRgba } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  cardContainerShadow: ViewStyle;
  card: ViewStyle;
  text: TextStyle;
  row: ViewStyle;
  cardsText: TextStyle;
  streakText: TextStyle;
  livesText: TextStyle;
  button: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: { backgroundColor: colors[theme].main.primaryBackground },
    card: {
      marginTop: sizing.m,
      marginHorizontal: 24,
      paddingVertical: 16,
      marginBottom: 24,
      borderRadius: 16,
      flexDirection: 'row',
    },
    cardContainerShadow: {
      shadowColor:
        Platform.OS === 'ios'
          ? '#000000'
          : changeOpacityOfRgbaColor(hexColorToRgba('#000000'), 0.4),
      borderRadius: 16,
      backgroundColor: '#F6F4EF',
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 8,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    text: { color: colors[theme].text.primary },
    row: { flexDirection: 'row', marginTop: 4 },
    cardsText: { color: '#3EA78E', marginLeft: 4 },
    streakText: { color: '#FF7324', marginLeft: 4 },
    livesText: { color: '#D74141', marginLeft: 4 },
    button: { marginBottom: 24 },
  });
};

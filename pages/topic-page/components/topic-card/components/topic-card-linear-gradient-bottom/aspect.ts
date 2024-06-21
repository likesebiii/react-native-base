import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  container: ViewStyle;
  cardContent: ViewStyle;
  align: ViewStyle;
  learnMoreText: TextStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    cardContent: {
      overflow: 'hidden',
    },
    align: { alignItems: 'center' },
    learnMoreText: {
      marginTop: 8,
      marginHorizontal: 24,
      fontSize: 32,
      color: '#FFFFFF',
      fontFamily: 'JockeyOne-Regular',
    },
  });
};

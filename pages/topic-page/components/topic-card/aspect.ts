import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  container: ViewStyle;
  cardBack: ViewStyle;
  cardContent: ViewStyle;
  questionBackCover: ViewStyle;
  iDoNotCareText: TextStyle;
  learnMoreText: TextStyle;
  align: ViewStyle;
  center: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    cardBack: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      zIndex: 2,
    },
    cardContent: {
      overflow: 'hidden',
    },
    questionBackCover: {},
    iDoNotCareText: {
      marginBottom: 16,
      marginHorizontal: 24,
      fontSize: 32,
      color: '#FFFFFF',
      fontFamily: 'JockeyOne-Regular',
    },
    learnMoreText: {
      marginTop: 8,
      marginHorizontal: 24,
      fontSize: 32,
      color: '#FFFFFF',
      fontFamily: 'JockeyOne-Regular',
    },
    align: { alignItems: 'center' },
    center: { justifyContent: 'flex-end', alignItems: 'center' },
  });
};

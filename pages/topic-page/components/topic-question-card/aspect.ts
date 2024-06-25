import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';

type AspectStyle = {
  cardContent: ViewStyle;
  subtitle: TextStyle;
  questionTitle: ViewStyle;
  titleContent: ViewStyle;
  title: ViewStyle;
  textTitle: TextStyle;
  absolute: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    cardContent: {
      overflow: 'hidden',
    },
    subtitle: {
      color: '#9E8766',
      marginTop: sizing.xl,
      textAlign: 'center',
    },
    questionTitle: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#F6F4EF',
      textAlign: 'center',
    },
    textTitle: {
      fontFamily: 'Texturina-SemiBold',
      color: '#F6F4EF',
      textAlign: 'center',
    },
    absolute: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backfaceVisibility: 'hidden',
    },
  });
};

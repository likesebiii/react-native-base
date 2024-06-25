import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  cardContent: ViewStyle;
  margin: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    cardContent: {},
    margin: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

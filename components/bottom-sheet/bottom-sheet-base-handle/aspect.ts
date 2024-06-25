import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      width: 36,
      backgroundColor: '#EEEEEE',
      alignSelf: 'center',
      height: 6,
      borderRadius: 3,
      position: 'absolute',
      top: -sizing.s,
    },
  });
};

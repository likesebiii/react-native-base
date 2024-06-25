import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { typography } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  text: TextStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: { ...typography['noscale']['texturina-36-regular'] },
  });
};

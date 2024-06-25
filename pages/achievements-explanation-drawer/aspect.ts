import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { ThemeType } from 'types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  modalStyle: ViewStyle;
  NSITitle: ViewStyle;
  NSISubtitle: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flex: 1,
      paddingHorizontal: sizing.xs,
      alignItems: 'center',
    },
    modalStyle: {
      backgroundColor: colors[theme].main.primaryBackground,
    },
    NSITitle: { color: colors.light.text.primary, textAlign: 'center' },
    NSISubtitle: {
      color: colors.light.text.primary,
      textAlign: 'center',
      marginTop: 36,
      marginBottom: 42,
    },
  });
};

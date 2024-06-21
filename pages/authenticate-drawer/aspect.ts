import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { ThemeType } from 'types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  margin: ViewStyle;
  modalStyle: ViewStyle;
  buttonsContainer: ViewStyle;
  listContent: ViewStyle;
  errorText: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    modalStyle: {
      backgroundColor: colors[theme].main.primaryBackground,
    },
    margin: { marginTop: sizing.s },
    buttonsContainer: {
      marginTop: 48,
      marginBottom: sizing.xxl,
    },
    listContent: {
      paddingTop: sizing.xl,
    },
    errorText: {
      marginTop: 8,
      flex: 1,
      alignSelf: 'center',
      color: colors[theme].error,
    },
  });
};

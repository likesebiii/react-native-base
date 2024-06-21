import { ViewStyle, StyleSheet } from 'react-native';
import { ThemeType } from 'types';
import { colors } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  modalStyle: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    modalStyle: {
      backgroundColor: colors[theme].main.primaryBackground,
      marginBottom: 24,
    },
  });
};

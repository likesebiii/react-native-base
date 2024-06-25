import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { ThemeType } from 'types';
import { colors } from '@theme';
import { BASE_BOTTOM_PADDING } from '@utils';
import { Dimensions } from '@services';

type AspectStyle = {
  container: ViewStyle;
  modalStyle: ViewStyle;
  secondaryButton: TextStyle;
  text: TextStyle;
  lottie: ViewStyle;
  contentContainer: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flex: 1,
      paddingTop: 32,
      paddingBottom: BASE_BOTTOM_PADDING - 16,
      paddingHorizontal: 24,
    },
    modalStyle: {
      backgroundColor: colors[theme].main.primaryBackground,
    },
    secondaryButton: {
      color: colors.dark.text.primary,
      marginTop: 12,
      lineHeight: 24,
    },
    text: {
      color: colors.dark.text.primary,
      textAlign: 'center',
    },
    lottie: {
      width: Dimensions.get('width') * 0.5,
      height: Dimensions.get('width') * 0.3,
    },
    contentContainer: { alignItems: 'center' },
  });
};

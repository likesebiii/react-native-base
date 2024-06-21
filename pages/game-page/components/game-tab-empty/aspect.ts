import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';
import { BASE_BOTTOM_BAR_HEIGHT } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  lottie: ViewStyle;
  text: TextStyle;
  title: TextStyle;
  subtitle: TextStyle;
  bottomContainer: ViewStyle;
  lineThrough: TextStyle;
  beta: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flex: 1,
      backgroundColor: colors[theme].main.primaryBackground,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: BASE_BOTTOM_BAR_HEIGHT + 48 + 48,
    },
    lottie: { width: screenHeight * 0.3, height: screenHeight * 0.3 },
    text: { color: colors[theme].text.primary },
    subtitle: {
      textAlign: 'center',
      color: colors[theme].text.primary,
      marginTop: 24,
    },
    title: {
      marginTop: 12,
      textAlign: 'center',
      color: colors[theme].text.primary,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: BASE_BOTTOM_BAR_HEIGHT + 48,
    },
    lineThrough: { textDecorationLine: 'line-through' },
    beta: { marginTop: 16 },
  });
};

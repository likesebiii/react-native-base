import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_TOP_PADDING } from '@utils';
import { interpolate } from 'react-native-reanimated';
import { colors, sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  bottomContainer: ViewStyle;
  button: TextStyle;
  streakTitle: TextStyle;
  lottie: ViewStyle;
  calendar: ViewStyle;
  calendarContainer: ViewStyle;
  removeBackground: ViewStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (screenHeight: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      container: {
        position: 'absolute',
        top: -BASE_TOP_PADDING,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
      },
      bottomContainer: {
        position: 'absolute',
        bottom: 0,
        top: interpolate(screenHeight, [667, 852], [40, 70]) + BASE_TOP_PADDING,
        left: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: colors[theme].main.primaryBackground,
      },
      button: {
        textAlign: 'center',
        marginHorizontal: 24,
        marginTop: 8,
      },
      streakTitle: {
        color: colors[theme].text.primary,
        marginTop: sizing.m,
      },
      lottie: {
        width: screenHeight * 0.4,
        height: screenHeight * 0.4,
      },
      calendarContainer: { width: '100%', alignItems: 'center' },
      calendar: {
        alignItems: 'center',
        marginTop: 12,
        width: screenWidth - 3 * sizing.m,
      },
      removeBackground: { backgroundColor: undefined },
    });
  };

import { ViewStyle, StyleSheet } from 'react-native';
import { ThemeType } from 'types';
import { border, colors, sizing } from '@theme';
import { BASE_BOTTOM_PADDING, BASE_STATUS_BAR_HEIGHT } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  background: ViewStyle;
  content: ViewStyle;
  modal: ViewStyle;
  header: ViewStyle;
  footer: ViewStyle;
  flexContainer: ViewStyle;
  list: ViewStyle;
};
export const aspectStyle = (theme: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flex: 1,
    },
    background: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 1,
    },
    flexContainer: {
      flex: 1,
    },
    content: {
      flexDirection: 'column',
      paddingHorizontal: 16,
      alignItems: 'center',
      position: 'absolute',
      borderRadius: 10,
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[theme].main.primaryBackground,
      borderRadius: border.m,
      padding: 32,
      maxHeight:
        screenHeight -
        BASE_STATUS_BAR_HEIGHT -
        BASE_BOTTOM_PADDING -
        2 * sizing.xl,
    },
    header: {
      marginBottom: sizing.xl,
      alignItems: 'center',
    },
    footer: {
      marginTop: sizing.xl,
      alignItems: 'center',
    },
    list: {
      width: '100%',
    },
  });
};

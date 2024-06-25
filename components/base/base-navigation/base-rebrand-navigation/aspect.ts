import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';
import { BASE_BOTTOM_BAR_HEIGHT } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  textContainer: ViewStyle;
  row: ViewStyle;
  iconTextContainer: ViewStyle;
  iconText: TextStyle;
  button: ViewStyle;
  right: ViewStyle;
  bottomBar: ViewStyle;
  gradient: ViewStyle;
  items: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (screenHeight: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: screenHeight,
      zIndex: 1,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: BASE_BOTTOM_BAR_HEIGHT,
      paddingHorizontal: sizing.xl,
      flexDirection: 'row',
      paddingTop: 6,
    },
    gradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    textContainer: {
      justifyContent: 'center',
      flex: 1,
      marginRight: 24,
      height: 42,
    },
    row: { flexDirection: 'row' },
    iconTextContainer: {
      flex: 1,
    },
    iconText: {
      color: '#0D394C',
      lineHeight: undefined,
      bottom: 1,
    },
    button: {
      left: -2,
      marginRight: sizing.xs,
      overflow: 'visible',
    },
    right: {
      marginLeft: sizing.xs,
    },
    items: {
      flexDirection: 'row',
      flex: 1,
      height: 36,
      alignItems: 'center',
    },
  });
};

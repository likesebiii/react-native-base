import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { changeOpacityOfRgbaColor, hexColorToRgba } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  left: ViewStyle;
  right: ViewStyle;
  titleContainer: ViewStyle;
  separatorContainer: ViewStyle;
  separator: ViewStyle;
  subtitle: TextStyle;
  lineThrough: TextStyle;
  separatorEnabled: ViewStyle;
  separatorDisabled: ViewStyle;
  separatorUndefined: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
    },
    left: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
      margin: sizing.xxs,
    },
    right: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginRight: sizing.xl,
      marginBottom: 2,
      flex: 1,
    },
    titleContainer: {
      justifyContent: 'center',
      marginLeft: sizing.m,
      height: 44,
    },
    separatorContainer: { height: 40, overflow: 'visible', zIndex: -2 },
    separator: {
      top: -25,
      height: 90,
      width: 25,
      marginTop: 2,
      borderRadius: 30,
    },
    subtitle: {
      marginTop: -sizing.xs,
      marginLeft: sizing.m,
      paddingBottom: sizing.xs,
      color: colors[theme].text.secondary,
    },
    lineThrough: {
      textDecorationLine: 'line-through',
    },
    separatorEnabled: {
      backgroundColor: changeOpacityOfRgbaColor(
        hexColorToRgba(colors[theme].text.primary),
        0.7,
      ),
    },
    separatorDisabled: {
      backgroundColor: changeOpacityOfRgbaColor(hexColorToRgba('#FCFBF3'), 0.6),
    },
    separatorUndefined: {
      height: 0,
    },
  });
};

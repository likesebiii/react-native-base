import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors } from '@theme';
import { scaleFontSizeToPixelRatioAndroid } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  sRow: ViewStyle;
  textContainer: ViewStyle;
  row: ViewStyle;
  difficulty: TextStyle;
  subtitle: ViewStyle;
  lastStep: ViewStyle;
  iconTextContainer: ViewStyle;
  iconText: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {},
    subtitle: {
      top: 6,
      fontFamily: 'Texturina-Regular',
      fontSize:
        Platform.OS === 'android' ? scaleFontSizeToPixelRatioAndroid(33) : 33,
      lineHeight:
        Platform.OS === 'android' ? scaleFontSizeToPixelRatioAndroid(37) : 37,
      color: colors[theme].text.primary,
    },
    lastStep: {
      color: colors[theme].text.primary,
      top: Platform.OS === 'ios' ? 14 : 24,
      left: Platform.OS === 'ios' ? 2 : -4,
    },
    sRow: {
      flexDirection: 'row',
      height: Platform.OS === 'ios' ? '100%' : 54,
    },
    textContainer: {
      justifyContent: 'center',
      flex: 1,
      marginRight: 24,
      marginLeft: 8,
    },
    row: { flexDirection: 'row' },
    difficulty: {
      color: colors[theme].text.primary,
      textTransform: 'capitalize',
    },
    iconTextContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    iconText: {
      color: '#0D394C',
      lineHeight: undefined,
    },
  });
};

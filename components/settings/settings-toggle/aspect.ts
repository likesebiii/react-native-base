import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';

type AspectStyle = {
  titleContainer: ViewStyle;
  subtitle: TextStyle;
  toggle: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    title: {
      color: colors[theme].text.primary,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: sizing.xl,
    },
    titleContainer: {
      flex: 1,
    },
    subtitle: {
      marginTop: sizing.xxs,
      color: colors[theme].text.secondary,
    },
    toggle: {
      flex: 0.3,
      alignItems: 'flex-end',
    },
  });
};

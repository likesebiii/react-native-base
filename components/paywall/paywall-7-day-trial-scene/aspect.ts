import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing, colors } from '@theme';
import { BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  explanatory: ViewStyle;
};

export const aspectStyle = (theme: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      paddingBottom: sizing.xl + 250,
      paddingTop: BASE_TOP_PADDING + sizing.xl,
    },
    titleContainer: {
      alignItems: 'center',
      marginTop: sizing.xl,
      paddingHorizontal: sizing.l,
    },
    title: {
      color: colors[theme].text.primary,
      textAlign: 'center',
    },
    explanatory: {
      width: '100%',
      marginTop: sizing.l,
      paddingHorizontal: 32,
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
  });
};

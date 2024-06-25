import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { BASE_BOTTOM_PADDING, BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  sectionListContent: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  difficulty: TextStyle;
  firstQuestion: ViewStyle;
  questionsContainer: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    sectionListContent: {
      paddingBottom: BASE_BOTTOM_PADDING,
      paddingTop: BASE_TOP_PADDING,
    },
    titleContainer: {
      marginBottom: 16,
      marginLeft: 24,
      marginRight: 24,
    },
    title: {
      color: '#0D394C',
      fontFamily: 'Texturina-Black',
      fontSize: 24,
    },
    difficulty: {
      color: '#30718D',
      fontFamily: 'Texturina-Black',
      fontSize: 18,
      textTransform: 'capitalize',
    },
    firstQuestion: { marginRight: 16 },
    questionsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      marginBottom: 16,
    },
  });
};

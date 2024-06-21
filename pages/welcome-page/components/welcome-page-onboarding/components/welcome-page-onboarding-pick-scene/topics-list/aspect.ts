import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  text: TextStyle;
  gradient: ViewStyle;
  itemContainer: ViewStyle;
  image: ImageStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  fillContainer: ViewStyle;
  checkContainer: ViewStyle;
  listContainer: ViewStyle;
  listContent: ViewStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (screenHeight: number, screenWidth: number) => {
    const CARD_SIZE = (screenWidth - 24 - 24 - 16) / 2;

    return StyleSheet.create<AspectStyle>({
      container: {
        position: 'absolute',
        top: -BASE_TOP_PADDING,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
      },
      text: {
        color: colors[theme].text.primary,
        textAlign: 'center',
      },
      gradient: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
      itemContainer: {
        flexDirection: 'row',
        width: CARD_SIZE,
        height: CARD_SIZE,
        marginBottom: sizing.m,
        borderRadius: sizing.m,
        overflow: 'hidden',
      },
      image: { width: CARD_SIZE, height: CARD_SIZE, borderRadius: 16 },
      titleContainer: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 16,
      },
      title: { color: '#FFFFFF' },
      fillContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      checkContainer: {
        position: 'absolute',
        right: sizing.m,
        bottom: sizing.m,
      },
      listContainer: {
        flex: 1,
        top: BASE_TOP_PADDING + 48 + 32,
        zIndex: -1,
        width: '100%',
      },
      listContent: {
        paddingTop: 24,
        paddingBottom: screenHeight / 3,
      },
    });
  };

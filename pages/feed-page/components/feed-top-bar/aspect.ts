import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ThemeType } from '@types';
import { BASE_HEADER_HEIGHT, scaleFontSizeToPixelRatioAndroid } from '@utils';
import { sizing } from '@theme';

type AspectStyle = {
  container: ViewStyle;
  row: ViewStyle;
  livesText: TextStyle;
  streakText: TextStyle;
  streakDisabledText: TextStyle;
  text: TextStyle;
  firstImage: ViewStyle;
  image: ImageStyle;
  cardsText: TextStyle;
  cardsRow: ViewStyle;
  gradient: ViewStyle;
  cardsContainer: ViewStyle;
  gift: TextStyle;
};

export const aspectStyle = (_: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      justifyContent: 'space-between',
      zIndex: 1005,
      paddingHorizontal: 24,
      paddingBottom: 12,
      height: BASE_HEADER_HEIGHT,
    },
    gradient: { position: 'absolute', top: 0, bottom: -5, left: 0, right: 0 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 36,
    },
    livesText: { color: '#D74141', marginLeft: 4, bottom: 1 },
    streakText: { color: '#FF7324' },
    text: {
      fontFamily: 'Texturina-Regular',
      fontSize:
        Platform.OS === 'android' ? scaleFontSizeToPixelRatioAndroid(33) : 33,
      lineHeight:
        Platform.OS === 'android' ? scaleFontSizeToPixelRatioAndroid(37) : 37,
    },
    streakDisabledText: { color: '#8B8579' },
    firstImage: {
      backgroundColor: '#9BC2D3',
      width: 42,
      height: 42,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: sizing.s,
    },
    image: {
      width: 36,
      height: 36,
      borderRadius: 8,
    },
    cardsText: {
      color: '#48C29E',
    },
    cardsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 36,
      marginRight: 4,
    },
    cardsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: sizing.xs,
    },
    gift: { fontSize: 28, lineHeight: 38, marginLeft: 8 },
  });
};

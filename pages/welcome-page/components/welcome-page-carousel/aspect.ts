import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { colors, sizing } from '@theme';
import { BASE_BOTTOM_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  dotsContainer: ViewStyle;
  firstDot: ViewStyle;
  otherDot: ViewStyle;
  item: ViewStyle;
};

export const aspectStyle =
  (theme: ThemeType) => (_: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      container: {
        flex: 1,
        width: '100%',
        paddingTop: sizing.xxl,
        marginBottom: 86 + BASE_BOTTOM_PADDING + sizing.m,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      dotsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom: sizing.m,
      },
      firstDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: colors[theme].text.primary,
      },
      otherDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: colors[theme].text.primary,
        marginLeft: 4,
      },
      item: {
        width: screenWidth,
        overflow: 'hidden',
      },
    });
  };

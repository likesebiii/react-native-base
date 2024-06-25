import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { Dimensions } from '@services';

const GRADIENT_WIDTH = (Dimensions.get('width') - 32) / 2;

type AspectStyle = {
  container: ViewStyle;
  separatorContainer: ViewStyle;
  separatorLine: ViewStyle;
  separatorLeftGradient: ViewStyle;
  separatorRightGradient: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      width: '100%',
      height: 1,
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    },
    separatorContainer: {
      width: '100%',
      height: 1,
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    },
    separatorLine: {
      width: '100%',
      height: 1,
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    },
    separatorLeftGradient: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
      height: 1,
      width: GRADIENT_WIDTH,
    },
    separatorRightGradient: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      zIndex: 1,
      height: 1,
      width: GRADIENT_WIDTH,
    },
  });
};

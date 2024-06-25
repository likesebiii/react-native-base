import { ThemeType } from '@types';
import { StyleSheet, ViewStyle } from 'react-native';

type AspectStyle = {
  container: ViewStyle;
  circle: ViewStyle;
  firstIndicator: ViewStyle;
  secondIndicator: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      width: 20,
      height: 20,
    },
    circle: {
      width: 20,
      height: 20,
      borderRadius: 20,
      borderWidth: 2,
    },
    firstIndicator: {
      position: 'absolute',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      overflow: 'hidden',
      zIndex: 1,
    },
    secondIndicator: {
      position: 'absolute',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      overflow: 'hidden',
      zIndex: 2,
    },
  });
};

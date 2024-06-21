import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  cardContent: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  margin: ViewStyle;
  upperGradient: ViewStyle;
  height: ViewStyle;
  absolute: ViewStyle;
  mirror: ViewStyle;
  lowerGradient: ViewStyle;
  stateTitle: TextStyle;
  stateSubtitle: TextStyle;
  stateContainer: ViewStyle;
  stateIcon: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => (_: number) => {
  return StyleSheet.create<AspectStyle>({
    cardContent: {
      overflow: 'hidden',
      backgroundColor: '#7C7C7C',
    },
    textContainer: {
      height: '30%',
      justifyContent: 'center',
    },
    title: {
      color: '#F6F4EF',
      textAlign: 'center',
      lineHeight: undefined,
      textTransform: 'uppercase',
    },
    subtitle: {
      color: '#F6F4EF',
      textAlign: 'center',
      lineHeight: undefined,
    },
    margin: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    upperGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    height: { height: '100%' },
    absolute: { position: 'absolute', top: 0, left: 0, right: 0 },
    mirror: {
      marginTop: Platform.OS === 'ios' ? -1 : 0,
      transform: [{ rotate: '180deg' }, { rotateY: '180deg' }],
    },
    lowerGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    stateTitle: {
      color: '#F6F4EF',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    stateSubtitle: {
      color: '#F6F4EF',
      textAlign: 'center',
    },
    stateContainer: {
      position: 'absolute',
      bottom: 0,
      zIndex: 20,
    },
    stateIcon: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
};

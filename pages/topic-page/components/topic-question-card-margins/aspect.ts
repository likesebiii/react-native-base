import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';

type AspectStyle = {
  margin: ViewStyle;
  topTopicContainer: ViewStyle;
  topicText: TextStyle;
  bottomTopicContainer: ViewStyle;
  topTopic: ViewStyle;
  leftDifficulty: ViewStyle;
  topLeftDifficulty: ViewStyle;
  bottomRightDifficulty: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    margin: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topTopicContainer: {
      position: 'absolute',
      top: 7,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 1,
    },
    topicText: { color: '#F6F4EF', textTransform: 'uppercase' },
    bottomTopicContainer: {
      position: 'absolute',
      bottom: 7,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 1,
      transform: [{ scale: -1 }],
    },
    topTopic: {},
    leftDifficulty: {
      paddingVertical: 5,
      alignItems: 'center',
    },
    topLeftDifficulty: {
      position: 'absolute',
      left: 10,
      zIndex: 1,
      top: 42,
    },
    bottomRightDifficulty: {
      position: 'absolute',
      right: 10,
      zIndex: 1,
      bottom: 42,
    },
  });
};

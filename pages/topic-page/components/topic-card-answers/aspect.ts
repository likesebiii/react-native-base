import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import {
  INITIAL_Z_INDEX,
  NUMBER_OF_CARDS,
} from 'pages/topic-page/context/TopicProvider';
import { getCardHeight } from 'pages/topic-page/constants';

type AspectStyle = {
  answersContainer: ViewStyle;
  answersMargin: ViewStyle;
  firstAnswer: ViewStyle;
  secondAnswer: ViewStyle;
  thirdAnswer: ViewStyle;
  fourthAnswer: ViewStyle;
  firstIcon: ViewStyle;
  secondIcon: ViewStyle;
  thirdIcon: ViewStyle;
  fourthIcon: ViewStyle;
  leftAnswers: ViewStyle;
  rightAnswers: ViewStyle;
  answerText: TextStyle;
  dismissGesture: ViewStyle;
  touchable: ViewStyle;
};

export const CARD_ANSWERS_MARGIN = 46;

export const aspectStyle =
  (_: ThemeType) => (screenHeight: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      answersContainer: {
        position: 'absolute',
        zIndex: INITIAL_Z_INDEX + NUMBER_OF_CARDS + 1,
        height: getCardHeight(screenHeight),
        alignItems: 'center',
        width: screenWidth,
      },
      answersMargin: {
        top: (getCardHeight(screenHeight) - 220) / 2,
        position: 'absolute',
        height: 220,
        left: 0,
        right: 0,
      },
      touchable: {
        height: 80,
        top: -16,
      },
      firstAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1E',
        paddingVertical: 16,
        top: 0,
        left: -screenWidth / 1.5 + CARD_ANSWERS_MARGIN,
        borderRadius: 16,
        opacity: 0.8,
        overflow: 'hidden',
      },
      secondAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1E',
        paddingVertical: 16,
        bottom: 0,
        left: -screenWidth / 1.5 + CARD_ANSWERS_MARGIN,
        borderRadius: 16,
        opacity: 0.8,
      },
      thirdAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1E',
        paddingVertical: 16,
        top: 0,
        right: -screenWidth / 1.5 + CARD_ANSWERS_MARGIN,
        borderRadius: 16,
        opacity: 0.8,
      },
      fourthAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1E',
        paddingVertical: 16,
        bottom: 0,
        right: -screenWidth / 1.5 + CARD_ANSWERS_MARGIN,
        borderRadius: 16,
        opacity: 0.8,
      },
      firstIcon: {
        position: 'absolute',
        top: 24,
        right: 16,
      },
      secondIcon: {
        position: 'absolute',
        top: 24,
        right: 16,
        transform: [{ rotate: '-90deg' }],
      },
      thirdIcon: {
        position: 'absolute',
        top: 24,
        left: 16,
        transform: [{ rotate: '90deg' }],
      },
      fourthIcon: {
        position: 'absolute',
        top: 24,
        left: 16,
        transform: [{ rotate: '180deg' }],
      },
      leftAnswers: {
        position: 'absolute',
        left: 30,
        right: screenHeight / 13,
        top: 8,
        bottom: 8,
        justifyContent: 'center',
      },
      rightAnswers: {
        position: 'absolute',
        top: 8,
        left: screenHeight / 13,
        right: 30,
        bottom: 8,
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      answerText: { color: '#FFFFFF' },
      dismissGesture: {
        backgroundColor: 'red',
        position: 'absolute',
        height: screenHeight,
        top:
          -(getCardHeight(screenHeight) - 220) / 2 -
          (screenHeight - getCardHeight(screenHeight)) / 2,
        left: 0,
        right: 0,
      },
    });
  };

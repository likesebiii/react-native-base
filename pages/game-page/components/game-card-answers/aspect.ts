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
};

export const aspectStyle =
  (_: ThemeType) => (screenHeight: number, screenWidth: number) => {
    return StyleSheet.create<AspectStyle>({
      answersContainer: {
        position: 'absolute',
        zIndex: INITIAL_Z_INDEX + NUMBER_OF_CARDS + 1,
        height: getCardHeight(screenHeight),
        justifyContent: 'center',
        alignItems: 'center',
        width: getCardHeight(screenHeight) * 0.695,
      },
      answersMargin: {
        position: 'absolute',
        height: 200,
        left: 0,
        right: 0,
      },
      firstAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1ECC',
        top: 0,
        left: -screenWidth / 1.5,
        borderRadius: 16,
        opacity: 0.8,
        overflow: 'hidden',
      },
      secondAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1ECC',
        bottom: 0,
        left: -screenWidth / 1.5,
        borderRadius: 16,
        opacity: 0.8,
      },
      thirdAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1ECC',
        top: 0,
        right: -screenWidth / 1.5,
        borderRadius: 16,
        opacity: 0.8,
      },
      fourthAnswer: {
        position: 'absolute',
        height: 80,
        width: screenWidth / 1.5,
        backgroundColor: '#161C1ECC',
        bottom: 0,
        right: -screenWidth / 1.5,
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
    });
  };

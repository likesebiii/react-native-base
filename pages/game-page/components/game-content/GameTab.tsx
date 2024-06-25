import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { getCardHeight } from 'pages/topic-page/constants';
import { getQuestionsRecommendation, TopicQuestionsType } from '@utils';
import {
  DECK_CONTROLLER_HEIGHT,
  BOTTOM_CONTROLLER_BAR_HEIGHT,
  TABLE_REGION_HEIGHT,
  getMyTableRegion,
  getEnemyTableRegion,
} from 'pages/game-page/constants';
import GameBottomBar from '../game-bottom-bar/GameBottomBar';
import GameCard from '../game-card/GameCard';
import GameTableElementRegion from '../game-table-element-region/GameTableElementRegion';
import GameProvider from 'pages/game-page/context/GameProvider';

type GameTabProps = {};

const GameTab: React.FC<GameTabProps> = ({}) => {
  const { styles, screenHeight, screenWidth } = useBaseAspect(aspectStyle);

  const initialHeight = getCardHeight(screenHeight);
  const cardHeight = Math.min(
    DECK_CONTROLLER_HEIGHT - 20,
    ((screenWidth - 32) / 5) * 1.321,
  );

  const questions = getQuestionsRecommendation({ allQuestion: true });

  return (
    <View style={styles.container}>
      <GameTableElementRegion type={'enemy'} elementRegionOrder={0} />
      <GameTableElementRegion type={'mine'} elementRegionOrder={0} />
      <GameTableElementRegion type={'enemy'} elementRegionOrder={1} />
      <GameTableElementRegion type={'mine'} elementRegionOrder={1} />
      <GameTableElementRegion type={'enemy'} elementRegionOrder={2} />
      <GameTableElementRegion type={'mine'} elementRegionOrder={2} />
      <GameBottomBar />
      <View
        style={{
          position: 'absolute',
          height: screenHeight,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          flexDirection: 'row',
          paddingHorizontal: 16,
          zIndex: -1,
        }}
        pointerEvents={'box-none'}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
          return (
            <GameCard
              key={`me-game-card-${index}-${questions[index].id}`}
              cardHeight={cardHeight}
              initialHeight={initialHeight}
              question={questions[index] as TopicQuestionsType}
              initialCount={index}
              type={'me'}
            />
          );
        })}
        {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((index) => {
          return (
            <GameCard
              key={`enemy-game-card-${index}-${questions[index - 11].id}`}
              cardHeight={cardHeight}
              initialHeight={initialHeight}
              question={questions[index - 11] as TopicQuestionsType}
              initialCount={index}
              type={'enemy'}
            />
          );
        })}

        <View
          style={{
            position: 'absolute',
            bottom: BOTTOM_CONTROLLER_BAR_HEIGHT,
            height: DECK_CONTROLLER_HEIGHT,
            left: 0,
            right: 0,
            backgroundColor: 'blue',
            zIndex: -2,
            opacity: 0.1,
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          height: TABLE_REGION_HEIGHT,
          left: 0,
          right: 0,
          top: getMyTableRegion(screenHeight),
          zIndex: -2,
          backgroundColor: 'green',
          opacity: 0.2,
        }}
        pointerEvents={'box-none'}
      />
      <View
        style={{
          position: 'absolute',
          height: TABLE_REGION_HEIGHT,
          left: 0,
          right: 0,
          top: getEnemyTableRegion(screenHeight),
          zIndex: -2,
          backgroundColor: 'purple',
          opacity: 0.2,
        }}
        pointerEvents={'box-none'}
      />
    </View>
  );
};

const GameTabWrapper: React.FC<GameTabProps> = (props) => {
  return (
    <GameProvider>
      <GameTab {...props} />
    </GameProvider>
  );
};

GameTabWrapper.displayName = 'fk.GameTab';

export default GameTabWrapper;

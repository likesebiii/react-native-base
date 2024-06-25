import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import GameTab from './components/game-content/GameTab';

export type GamePageProps = {};

const GamePage: React.FC<GamePageProps & PageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <Page style={styles.container}>
      <GameTab />
    </Page>
  );
};

GamePage.displayName = 'fk.GamePage';

export default GamePage;

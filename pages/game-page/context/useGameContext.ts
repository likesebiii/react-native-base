import React from 'react';
import { GameContext } from './GameProvider';

export const useGameContext = () => {
  const gameContextState = React.useContext(GameContext);

  return gameContextState;
};

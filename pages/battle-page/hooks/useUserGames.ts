import React from 'react';
import { GameAPI } from '@services';
import { UserGamesResponse } from 'services/api/types/response.types';

export const useUserGames = () => {
  const [games, setGames] = React.useState<UserGamesResponse>();

  React.useEffect(() => {
    GameAPI.getUserGames({})
      .then((response) => {
        setGames(response);
      })
      .catch((error) => {
        console.log(`[useUserGames] error: ${error}`);
      });
  }, []);

  return { games };
};

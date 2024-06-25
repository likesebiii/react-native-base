import { BASE_API_ENDPOINT } from 'utils/constants';
import { Requests } from '../management';
import { UserGamesResponse } from '../types/response.types';

const GameAPI = {
  getUserGames: ({}: {}): Promise<UserGamesResponse> => {
    let url = `/api/games`;

    return Requests.get<UserGamesResponse>(url, {
      baseURL: BASE_API_ENDPOINT,
    });
  },
} as const;

export default GameAPI;

export type ProfileResponse = {
  email: string;
  username: string;
  id: string;
  sessions: number;
  firstName?: string;
  lastName?: string;
};

export type UserGameResponse = {
  id: string;
  owner: string;
  opponent?: string;
  achievements: string[];
  questions: string[];
  createdAt: string;
  stats: {
    correctAnswersOwner: number;
    correctAnswersOpponent?: number;
    ownerStats?: { time?: number }[];
    opponentStats?: { time?: number }[];
  };
};
export type UserGamesResponse = {
  matchesWaitingForOpponent: UserGameResponse[];
  matchesWaitingForResponse: UserGameResponse[];
  matchesPlayed: UserGameResponse[];
};

export type AuthenticateResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type UpdateResponse = string;

export type RegisterResponse =
  | UpdateResponse
  | {
      user: [string];
    };

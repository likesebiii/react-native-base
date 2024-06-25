import { Authenticate, UserType } from '@types';
import {
  AuthenticateResponse,
  ProfileResponse,
} from 'services/api/types/response.types';

const ReduxCurrentUtils = {
  normalizeProfileResponse: (profile: ProfileResponse) => {
    const currentProfile: UserType = {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      sessions: Number(profile.sessions ?? 0),
    };

    return {
      profile: currentProfile,
    };
  },
  normalizeAuthenticateResponse: (
    authenticateResponse: AuthenticateResponse,
  ): Authenticate => {
    return {
      accessToken: authenticateResponse.access_token,
      expiresIn: authenticateResponse.expires_in,
      refreshToken: authenticateResponse.refresh_token,
      scope: authenticateResponse.scope,
      tokenType: authenticateResponse.token_type,
    };
  },
};

export default ReduxCurrentUtils;

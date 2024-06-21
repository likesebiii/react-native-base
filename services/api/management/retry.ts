import { Analytics } from 'services/analytics';
import AuthAPI from '../apis/auth';
import { AuthenticateResponse } from '../types/response.types';

const APIRetry: {
  request?: Promise<AuthenticateResponse>;
  triggered?: boolean;
  getRefreshToken: (params: {
    refreshToken: string;
  }) => Promise<AuthenticateResponse>;
  reset: () => void;
} = {
  reset: () => {
    APIRetry.request = undefined;
    APIRetry.triggered = undefined;
  },
  getRefreshToken: ({ refreshToken }: { refreshToken: string }) => {
    // Avoid calling multiple times
    if (APIRetry.request === undefined) {
      APIRetry.request = AuthAPI.refreshToken({
        refreshToken,
      });

      APIRetry.request.then(APIRetry.reset, APIRetry.reset);
      Analytics.log('refreshAuthenticationToken', {}, ['amplitude']);
    }

    return APIRetry.request;
  },
} as const;

export default APIRetry;

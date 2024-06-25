import axios from 'axios';
import APIController from './controller';
import Requests from './requests';
import APIRetry from './retry';
import Analytics from '../../analytics/analytics';
import { BASE_API_ENDPOINT } from '@utils';
import { onLogout } from 'services/navigation/navigation.utils';
import { Redux } from '@services';

const onError = (error: any) => {
  Analytics.log(
    'tokenError',
    {
      type: 'refresh-token',
      error: JSON.stringify(error),
    },
    ['amplitude'],
  );
};

Requests.client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (
      error?.response?.status === 401 &&
      !request._retry &&
      !request.url.includes('realms') &&
      request.baseURL.includes(BASE_API_ENDPOINT)
    ) {
      const refreshToken = APIController.getRefreshToken();
      // Internal state to
      // identify that the request needs retry
      request._retry = true;

      if (refreshToken) {
        try {
          const response = await APIRetry.getRefreshToken({
            refreshToken,
          });
          const token = response.access_token;
          const newRefreshToken = response.refresh_token;

          APIController.setAuthToken(token);

          request.headers.Authorization = 'Bearer ' + token;

          if (APIRetry.triggered === false) {
            APIRetry.triggered = true;
            Redux.dispatchThunk('current', 'loginThunk', {
              token,
              refreshToken: newRefreshToken,
              type: 'refresh',
            });
          }

          return axios(request);
        } catch (e: any) {
          onLogout();
          onError(e);
        }
      } else {
        onLogout();
        onError('Refresh token undefined');
      }
    }

    return Requests.onRequestError(error);
  },
);

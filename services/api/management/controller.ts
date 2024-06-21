import { BASE_API_ENDPOINT_TOKEN } from '@utils';
import Requests from './requests';
import MMKVAuthentication from 'services/mmkv/authentication';

const APIController = {
  setAuthToken: (token: string) => {
    MMKVAuthentication.setAuthToken(token);
    Requests.client.defaults.headers.common.Authorization = 'Bearer ' + token;
  },
  deleteAuthToken: () => {
    MMKVAuthentication.deleteAuthToken();
    Requests.client.defaults.headers.common.Authorization =
      'Bearer ' + BASE_API_ENDPOINT_TOKEN;
  },
  getAuthToken: MMKVAuthentication.getAuthToken,
  setRefreshToken: MMKVAuthentication.setRefreshToken,
  getRefreshToken: MMKVAuthentication.getRefreshToken,
  deleteRefreshToken: MMKVAuthentication.deleteRefreshToken,
} as const;

export default APIController;

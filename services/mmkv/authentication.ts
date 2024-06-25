import { MMKV } from 'react-native-mmkv';

const AUTH = {
  token: 'auth_token',
  refresh: 'refresh_auth_token',
};

const storage = new MMKV();

const MMKVAuthentication = {
  setAuthToken: (value: string) => {
    storage.set(AUTH['token'], value);
  },
  getAuthToken: () => {
    return storage.getString(AUTH['token']);
  },
  deleteAuthToken: () => {
    storage.delete(AUTH['token']);
  },
  setRefreshToken: (value: string) => {
    storage.set(AUTH['refresh'], value);
  },
  getRefreshToken: () => {
    return storage.getString(AUTH['refresh']);
  },
  deleteRefreshToken: () => {
    storage.delete(AUTH['refresh']);
  },
};

export default MMKVAuthentication;

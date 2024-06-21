import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
} from 'axios';
import { Platform } from 'react-native';
import { BASE_API_ENDPOINT, BASE_API_ENDPOINT_TOKEN } from 'utils/constants';
import { version } from '../../../../package.json';
import MMKVAuthentication from 'services/mmkv/authentication';

const RequestsHelper = {
  init: (axios: AxiosStatic) => {
    return axios.create({
      baseURL: BASE_API_ENDPOINT,
      headers: {
        common: {
          Authorization:
            'Bearer ' +
            (MMKVAuthentication.getAuthToken() ?? BASE_API_ENDPOINT_TOKEN),
        },
        'User-Agent': `${Platform.OS}/${version}`,
      },
    });
  },
} as const;

const Requests = {
  client: RequestsHelper.init(axios),
  onRequestSuccess: (response: AxiosResponse) => {
    console.log(`[requests] `, response);

    return {
      ...response.data,
      responseStatus: response.status,
      sessions: response.headers['x-sessions'],
    };
  },
  onRequestError: (error: AxiosError) => {
    console.log(`[requests] error`, error);

    return Promise.reject(error.response || error.message);
  },
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    return Requests.client
      .get<T, AxiosResponse<T>>(url, config)
      .then(Requests.onRequestSuccess);
  },
  post: async <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => {
    return Requests.client
      .post<T, AxiosResponse<T>>(url, data, config)
      .then(Requests.onRequestSuccess);
  },
  put: async <T, D>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig | undefined,
  ) => {
    return Requests.client
      .put<T, AxiosResponse<T>>(url, data, config)
      .then(Requests.onRequestSuccess);
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    return Requests.client
      .delete<T, AxiosResponse<T>>(url, config)
      .then(Requests.onRequestSuccess);
  },
  patch: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig) => {
    return Requests.client
      .patch<T, AxiosResponse<T>>(url, data, config)
      .then(Requests.onRequestSuccess);
  },
} as const;

export default Requests;

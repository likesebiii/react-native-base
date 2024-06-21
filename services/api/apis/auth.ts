import { BASE_API_ENDPOINT, BASE_API_OAUTH_TOKEN } from "utils/constants";
import { Requests } from "../management";
import { RegisterUserData } from "../types/data.types";
import {
  AuthenticateResponse,
  RegisterResponse,
} from "../types/response.types";

const REALM = "[application]-dev";
const LOGIN_URL = `/realms/${REALM}/protocol/openid-connect/token/`;

const AuthAPI = {
  login: (
    username: string,
    password: string
  ): Promise<AuthenticateResponse> => {
    const loginData = {
      grant_type: "password",
      client_id: "api-[application]",
      client_secret: BASE_API_OAUTH_TOKEN,
      username,
      password,
    };

    return Requests.post<AuthenticateResponse>(LOGIN_URL, loginData, {
      baseURL: BASE_API_ENDPOINT,
      headers: {
        Authorization: undefined,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  loginGoogle: (token: string): Promise<AuthenticateResponse> => {
    const loginData = {
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      client_id: "api-[application]",
      client_secret: BASE_API_OAUTH_TOKEN,
      subject_issuer: "google",
      subject_token: token,
    };

    return Requests.post<AuthenticateResponse>(LOGIN_URL, loginData, {
      baseURL: BASE_API_ENDPOINT,
      headers: {
        Authorization: undefined,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  loginApple: (token: string): Promise<AuthenticateResponse> => {
    const loginData = {
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      client_id: "api-[application]",
      client_secret: BASE_API_OAUTH_TOKEN,
      subject_issuer: "apple",
      subject_token: token,
      subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
    };

    return Requests.post<AuthenticateResponse>(LOGIN_URL, loginData, {
      baseURL: BASE_API_ENDPOINT,
      headers: {
        Authorization: undefined,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  register: (email: string, password: string): Promise<RegisterResponse> => {
    const url = `/admin/realms/${REALM}/users`;

    return Requests.post<RegisterResponse, RegisterUserData>(
      url,
      {
        username: email,
        email,
        firstName: "",
        lastName: "",
        enabled: true,
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
      },
      { baseURL: BASE_API_ENDPOINT }
    );
  },
  refreshToken: ({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<AuthenticateResponse> => {
    const loginData = {
      grant_type: "refresh_token",
      client_id: "api-[application]",
      client_secret: BASE_API_OAUTH_TOKEN,
      refresh_token: refreshToken,
    };

    return Requests.post<AuthenticateResponse>(LOGIN_URL, loginData, {
      baseURL: BASE_API_ENDPOINT,
      headers: {
        Authorization: undefined,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
} as const;

export default AuthAPI;

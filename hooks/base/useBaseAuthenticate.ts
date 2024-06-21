import {
  UserType,
  LoginProvider,
  AuthenticateType,
  UserCredentials,
} from '@types';
import { Keyboard } from 'react-native';
import { validateEmail, validatePassword } from '@utils';
import { Analytics, AuthAPI, Redux } from '@services';
import { Alert } from 'react-native';
import * as AppleAuth from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes as GoogleStatusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { AuthenticateResponse } from 'services/api/types/response.types';
import ReduxCurrentUtils from 'services/redux/current/current.utils';

const useBaseAuthenticate = () => {
  const [loadingState, setLoadingState] = React.useState<AuthenticateType>();

  const onSuccess = () => {
    const onSuccess = () => {
      NAVIGATION_CONTROLLER.setRoot('fk.RootPage');
    };

    NAVIGATION_CONTROLLER.close(onSuccess);
    Keyboard.dismiss();
  };

  const onFinish = ({
    authenticateResponse,
    credentials,
    type,
  }: {
    authenticateResponse: AuthenticateResponse;
    credentials?: UserCredentials;
    type?: LoginProvider;
  }) => {
    const authenticate =
      ReduxCurrentUtils.normalizeAuthenticateResponse(authenticateResponse);
    const token = authenticate.accessToken;
    const refreshToken = authenticate.refreshToken;

    const onFetchCurrentProfileInfoSuccess = (props: {
      userId: string;
      user: UserType;
    }) => {
      const sessions = props.user.sessions;

      if (sessions === 1) {
        Analytics.log(
          'signUp',
          {
            method: type,
            email: credentials?.email,
          },
          ['amplitude', 'firebase'],
          'forceUpload',
        );
      }
    };

    Redux.dispatchThunk('current', 'loginThunk', {
      token,
      refreshToken,
      credentials,
      onSuccess,
      onFetchCurrentProfileInfoSuccess,
      type,
    });
  };

  const onContinue = async (
    type: AuthenticateType,
    credentials?: UserCredentials,
    authenticationType?: 'login' | 'login-from-register' | 'register',
  ): Promise<AuthenticateResponse> => {
    setLoadingState(type);

    const state: {
      response?: AuthenticateResponse;
      type: 'success' | 'rejected';
      error_description?: string;
    } = { type: 'success' };

    switch (type) {
      case 'email':
        if (authenticationType?.includes('login')) {
          if (credentials) {
            Keyboard.dismiss();

            const { email, password } = credentials;

            try {
              const response = await AuthAPI.login(email, password);

              state.response = response;
            } catch (error: any) {
              if (authenticationType === 'login-from-register') {
                state.type = 'rejected';
                state.error_description =
                  'An account with this username already exists.';
              } else {
                const description =
                  error?.data?.error_description ??
                  error?.message ??
                  `The username and password didn't match.`;

                state.type = 'rejected';
                state.error_description =
                  typeof error === 'string' ? error : description;
              }
            }
          } else {
            state.type = 'rejected';
            state.error_description = 'Invalid credentials';
          }
        } else {
          if (credentials) {
            const { email, password } = credentials;

            if (!validatePassword(password)) {
              state.type = 'rejected';
              state.error_description =
                'Password length must be between 6 and 100';
              break;
            } else if (!validateEmail(email)) {
              state.type = 'rejected';
              state.error_description = 'Invalid email address';
              break;
            }

            try {
              AuthAPI.register(email, password).then(() => {
                onSuccess?.();
              });

              return onContinue(type, credentials, 'login');
            } catch (error: any) {
              const description =
                error?.data?.error ?? error?.data?.errorMessage;

              if (description === 'User exists with same username') {
                return onContinue(type, credentials, 'login-from-register');
              }
            }
          } else {
            state.type = 'rejected';
            state.error_description = 'Invalid credentials';
          }
        }
        break;
      case 'apple':
        try {
          const { identityToken } = await AppleAuth.appleAuth.performRequest({
            requestedOperation: AppleAuth.default.Operation.LOGIN,
            requestedScopes: [
              AppleAuth.default.Scope.EMAIL,
              AppleAuth.default.Scope.FULL_NAME,
            ],
          });

          if (identityToken) {
            const response = await AuthAPI.loginApple(identityToken);

            state.response = response;
          } else {
            state.type = 'rejected';
            state.error_description = 'Invalid identity token';
          }
        } catch (error: any) {
          const description = error?.data?.error_description;

          state.type = 'rejected';
          state.error_description =
            typeof error === 'string'
              ? error
              : error?.code === AppleAuth?.AppleError?.CANCELED
              ? 'Login interrupted'
              : description ?? 'Error when logging in';
        }
        break;
      case 'google':
        try {
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn();

          const tokens = await GoogleSignin.getTokens();

          if (tokens.accessToken) {
            const response = await AuthAPI.loginGoogle(tokens.accessToken);

            state.response = response;
          } else {
            state.type = 'rejected';
            state.error_description = 'Invalid access token';
          }
        } catch (error: any) {
          const description = error?.data?.error_description;

          state.type = 'rejected';
          state.error_description =
            typeof error === 'string'
              ? error
              : error?.code === GoogleStatusCodes.SIGN_IN_CANCELLED
              ? 'Login interrupted'
              : description ?? 'Error when logging in';
        }
        break;
      default:
        state.type = 'rejected';
        state.error_description = 'Invalid provider';
        return Promise.reject({
          data: { error_description: 'Invalid provider' },
        });
    }

    setLoadingState(undefined);

    if (state.type === 'rejected' || state.response === undefined) {
      return Promise.reject(state.error_description ?? '');
    } else {
      return Promise.resolve(state.response);
    }
  };

  const onLogin = async ({ credentials }: { credentials: UserCredentials }) => {
    try {
      const authenticateResponse = await onContinue(
        'email',
        credentials,
        'login',
      );

      onFinish({
        authenticateResponse,
        credentials,
        type: 'email',
      });

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  const onRegister = async ({
    credentials,
  }: {
    credentials: UserCredentials;
  }) => {
    try {
      const authenticateResponse = await onContinue(
        'email',
        credentials,
        'register',
      );

      onFinish({
        authenticateResponse,
        credentials,
        type: 'email',
      });

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  const onContinueApple = async () => {
    try {
      const authenticateResponse = await onContinue('apple');

      onFinish({
        authenticateResponse,
        type: 'apple',
      });
    } catch (error: any) {
      Alert.alert(error);
    }
  };

  const onContinueGoogle = async () => {
    try {
      const authenticateResponse = await onContinue('google');

      onFinish({
        authenticateResponse,
        type: 'google',
      });
    } catch (error: any) {
      Alert.alert(error);
    }
  };

  return {
    onRegister,
    onLogin,
    onContinueApple,
    onContinueGoogle,
    loadingState,
  };
};

export default useBaseAuthenticate;

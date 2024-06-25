import * as Keychain from 'react-native-keychain';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { UserType, LoginProvider, UserCredentials } from '@types';
import { APIController, MMKVStorage, ProfileAPI } from '@services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ReduxCurrentUtils from './current.utils';
import { onLogout } from 'services/navigation/navigation.utils';

const ReduxCurrentThunks = {
  fetchCurrentProfileInfo: createAsyncThunk(
    'thunk/current/fetchCurrentProfileInfo',
    async (
      {
        onSuccess,
        onFailure,
        newSession,
      }: {
        onSuccess?: (props: { userId: string; user: UserType }) => void;
        onFailure?: () => void;
        newSession?: boolean;
      },
      { rejectWithValue },
    ) => {
      try {
        const profileInfo = await ProfileAPI.getCurrentProfileInfo({
          newSession,
        });

        const { profile: profileData } =
          ReduxCurrentUtils.normalizeProfileResponse(profileInfo);

        onSuccess?.({ userId: profileData.id, user: profileData });

        return profileData;
      } catch (error) {
        console.log('[fetchCurrentProfile]', error);
        onFailure?.();

        return rejectWithValue(JSON.stringify(error));
      }
    },
  ),
  loginThunk: createAsyncThunk(
    'thunk/current/login',
    async (
      {
        token: tokenFromParams,
        refreshToken,
        credentials,
        onSuccess,
        onFetchCurrentProfileInfoSuccess,
        type,
      }: {
        token?: string;
        refreshToken?: string;
        credentials?: UserCredentials;
        onSuccess?: () => void;
        onFetchCurrentProfileInfoSuccess?: (props: {
          userId: string;
          user: UserType;
        }) => void;
        type?: LoginProvider;
      },
      thunkAPI,
    ) => {
      const token = tokenFromParams ?? APIController.getAuthToken();

      !!token && APIController.setAuthToken(token);
      !!refreshToken && APIController.setRefreshToken(refreshToken);

      if (token && type) {
        try {
          Keychain.setGenericPassword('token', token);
        } catch {
          console.log(`[current/login] error setting token in keychain`);
        }

        if (credentials) {
          try {
            await Keychain.setGenericPassword(
              credentials.email,
              credentials.password,
            );
          } catch {
            console.log('Keychain setGenericPassword error');
          }
        }

        thunkAPI.dispatch(
          ReduxCurrentThunks.fetchCurrentProfileInfo({
            onSuccess: onFetchCurrentProfileInfoSuccess,
            newSession: true,
          }),
        );

        onSuccess?.();

        return;
      } else {
        console.error(`[current/login] error: no token provided`);
        onLogout();

        return thunkAPI.rejectWithValue('No token provided');
      }
    },
  ),
  logoutThunk: createAsyncThunk('thunk/current/logout', (_) => {
    try {
      MMKVStorage.clear();
      APIController.deleteAuthToken();
      APIController.deleteRefreshToken();
      GoogleSignin.isSignedIn().then((signedIn) => {
        if (signedIn) {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
        }
      });
      Keychain.resetGenericPassword();
    } catch (error) {
      console.log('[current/logout]', JSON.stringify(error));
    }
  }),
};

export default ReduxCurrentThunks;

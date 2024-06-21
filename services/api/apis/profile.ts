import { BASE_API_ENDPOINT } from 'utils/constants';
import { Requests } from '../management';
import { UpdateProfileData } from '../types/data.types';
import { ProfileResponse, UpdateResponse } from '../types/response.types';

const ProfileAPI = {
  getCurrentProfileInfo: ({
    token,
    newSession,
  }: {
    token?: string;
    newSession?: boolean;
  }): Promise<ProfileResponse> => {
    let url = `/api/current`;

    const extraConfig = {
      Authorization: 'Bearer ' + token,
    };

    return Requests.get<ProfileResponse>(url, {
      baseURL: BASE_API_ENDPOINT,
      headers: {
        ...(token ? extraConfig : {}),
        'x-request-context': newSession ? 'login' : undefined,
      },
    });
  },
  updateProfileInfo: (
    userId: string,
    userProfile: UpdateProfileData,
  ): Promise<UpdateResponse> => {
    const url = `/api/users/${userId}`;

    return Requests.patch<UpdateResponse, any>(url, userProfile, {
      baseURL: BASE_API_ENDPOINT,
    });
  },
} as const;

export default ProfileAPI;

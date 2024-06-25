import { PixelRatio, Platform } from 'react-native';
import { Extrapolation, interpolate } from 'react-native-reanimated';

export const randomValue = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getAndroidPixelRatio = () => {
  const input = PixelRatio.getFontScale();

  return interpolate(input, [0, 1, 2], [0.8, 1, 1.4], Extrapolation.CLAMP);
};

export const ANDROID_PIXEL_RATIO =
  Platform.OS === 'android' ? getAndroidPixelRatio() : 1;

export const scaleFontSizeToPixelRatioAndroid = (fontSize: number) => {
  return fontSize * ANDROID_PIXEL_RATIO;
};

export const EMPTY_FUNCTION = () => null;

export const getTagQueryParams = (url: string) => {
  const regex = /([^=&]+)=?([^&]*)?/g,
    params: Record<string, string> = {};
  let match;

  while ((match = regex.exec(url))) {
    params[match[1]] = match[2] ?? 'true';
  }

  return params;
};

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6 && password.length <= 100;
};

export const LIVES_TIMEOUT = { free: 60 * 60 * 3 - 1, pro: 60 }; // In seconds
export const LIVES_LIMIT = { free: 3, pro: 7 };

export const CARDS_NSI_LIMIT = 25;
export const BATTLE_CARDS_LIMIT = 3;

export const MAX_TEXT_SIZE_MULTIPLIER = 1.1;
export const COLLECTED_CARDS_FIRST_SESSION_RATE = 5;
export const COLLECTED_CARDS_RATE = 12;

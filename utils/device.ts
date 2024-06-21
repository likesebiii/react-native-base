import { Platform } from 'react-native';

export const isOverAndroid13 = () => {
  if (
    Platform.OS === 'android' &&
    parseInt(Platform.Version.toString(), 10) >= 33
  ) {
    return true;
  } else {
    return false;
  }
};

export const isOverIOS145 = () => {
  if (
    Platform.OS === 'ios' &&
    parseFloat(Platform.Version.toString()) >= 14.5
  ) {
    return true;
  } else {
    return false;
  }
};

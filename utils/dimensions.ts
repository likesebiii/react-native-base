import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BASE_STATUS_BAR_HEIGHT } from './constants';

export const BASE_BOTTOM_PADDING =
  getBottomSpace() !== 0 ? getBottomSpace() + 16 : 32;
export const BASE_TOP_PADDING =
  BASE_STATUS_BAR_HEIGHT + (Platform.OS === 'ios' ? 32 : 0);

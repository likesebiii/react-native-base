import { Dimensions } from '@services';
import {
  BASE_BOTTOM_BAR_HEIGHT,
  BASE_TOP_PADDING,
  BASE_STATUS_BAR_HEIGHT,
} from '@utils';
import { Platform } from 'react-native';

export const getCardHeight = (screenHeight: number) => {
  return Math.min(
    screenHeight * 0.67 - BASE_BOTTOM_BAR_HEIGHT - BASE_STATUS_BAR_HEIGHT,
    Dimensions.get('width') * 0.75 * 1.438,
  );
};

export const getCardHeightWorklet = (screenHeight: number) => {
  'worklet';

  return Math.min(
    screenHeight * 0.67 - BASE_BOTTOM_BAR_HEIGHT - BASE_STATUS_BAR_HEIGHT,
    Dimensions.get('width') * 0.75 * 1.438,
  );
};

const cardHeight = getCardHeight(Dimensions.get('height'));
export const PADDING_TOP_LIVES = Math.min(
  BASE_TOP_PADDING,
  (Dimensions.get('height') -
    cardHeight -
    BASE_BOTTOM_BAR_HEIGHT -
    28 -
    (Platform.OS === 'android' ? 20 : 0) -
    48) /
    2,
);

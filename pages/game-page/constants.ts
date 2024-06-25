import { Dimensions } from '@services';
import { BASE_BOTTOM_BAR_HEIGHT } from '@utils';
import { getCardHeight } from 'pages/topic-page/constants';

export const THRESHOLD = Dimensions.get('width') / 15;

export const BOTTOM_CONTROLLER_BAR_HEIGHT = 40 + BASE_BOTTOM_BAR_HEIGHT;
export const DECK_CONTROLLER_HEIGHT = Dimensions.get('height') * 0.18;

export const TABLE_PLACEHOLDER_WIDTH =
  (Dimensions.get('width') - 32 - 8 - 16 - 8 - 16 - 8 - 8) / 6;
export const TABLE_PLACEHOLDER_HEIGHT = TABLE_PLACEHOLDER_WIDTH * 1.4;
export const TABLE_DEFAULT_PADDING = 24;

export const getTablePlaceholderScale = (cardHeight: number) => {
  'worklet';

  return TABLE_PLACEHOLDER_HEIGHT / cardHeight;
};

export const TABLE_REGION_HEIGHT = TABLE_PLACEHOLDER_HEIGHT * 2 + 32;
export const ENEMY_TABLE_REGION_PADDING = 10;

export const getMyTableRegion = (screenHeight: number) => {
  'worklet';

  return (
    screenHeight -
    DECK_CONTROLLER_HEIGHT -
    BOTTOM_CONTROLLER_BAR_HEIGHT -
    TABLE_REGION_HEIGHT -
    TABLE_DEFAULT_PADDING
  );
};

export const getEnemyTableRegion = (screenHeight: number) => {
  'worklet';

  return (
    screenHeight -
    DECK_CONTROLLER_HEIGHT -
    BOTTOM_CONTROLLER_BAR_HEIGHT -
    2 * TABLE_REGION_HEIGHT -
    TABLE_DEFAULT_PADDING -
    ENEMY_TABLE_REGION_PADDING
  );
};

export const getPlaceholderLocation = (count: number, type: 'me' | 'enemy') => {
  'worklet';

  const newCount = count % 12;
  const defaultTop =
    type == 'me'
      ? getMyTableRegion(Dimensions.get('height'))
      : getEnemyTableRegion(Dimensions.get('height'));
  const defaultLeft =
    Math.floor(newCount / 4) * (2 * TABLE_PLACEHOLDER_WIDTH + 8 + 12 + 8);

  return {
    x:
      newCount === 0 ||
      newCount === 2 ||
      newCount === 4 ||
      newCount === 6 ||
      newCount === 8 ||
      newCount === 10
        ? defaultLeft + 16
        : defaultLeft + 16 + TABLE_PLACEHOLDER_WIDTH + 8,
    y:
      newCount === 2 ||
      newCount === 3 ||
      newCount === 6 ||
      newCount === 7 ||
      newCount === 10 ||
      newCount === 11
        ? defaultTop + TABLE_PLACEHOLDER_HEIGHT + 20
        : defaultTop + 12,
  };
};

export const getFocusCardScale = (screenHeight: number, cardHeight: number) => {
  const fullCard = getCardHeight(screenHeight);

  return fullCard / cardHeight;
};

export const getFocusOrigin = (screenHeight: number) => {
  const fullCard = getCardHeight(screenHeight);
  const cardWidth = fullCard * 0.71;

  return {
    x: (Dimensions.get('width') - cardWidth) / 2,
    y: (Dimensions.get('height') - fullCard) / 2,
  };
};

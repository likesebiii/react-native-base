import { isOverAndroid13 } from '@utils';
import { Dimensions as DimensionsRN, Platform, StatusBar } from 'react-native';
import MMKVStorage from 'services/mmkv/storage';

const SCREEN_HEIGHT =
  MMKVStorage.getValue('screen_height') ??
  DimensionsRN.get('window').height - (StatusBar.currentHeight ?? 24);

type DimensionsListener = (height: number, width: number) => void;

const dimensionsHeight = Math.max(
  DimensionsRN.get('window').width,
  DimensionsRN.get('window').height,
);

const DimensionsHelper: {
  height: number;
  width: number;
  listeners: DimensionsListener[];
} = {
  height:
    Platform.OS === 'ios'
      ? dimensionsHeight
      : isOverAndroid13()
      ? dimensionsHeight
      : SCREEN_HEIGHT ?? dimensionsHeight,
  width: Math.min(
    DimensionsRN.get('window').width,
    DimensionsRN.get('window').height,
  ),
  listeners: [],
};
const Dimensions: {
  get: (type: 'height' | 'width') => number;
  addListener: (listener: DimensionsListener) => { remove: () => void };
  update: (props: { height?: number; width?: number }) => void;
} = {
  get: (type) => {
    return DimensionsHelper[type];
  },
  addListener: (listener) => {
    DimensionsHelper.listeners.push(listener);

    return {
      remove: () => {
        DimensionsHelper.listeners = DimensionsHelper.listeners.filter(
          (item) => item !== listener,
        );
      },
    };
  },
  update: ({ height: heightFromProps, width: widthFromProps }) => {
    const height = heightFromProps ?? DimensionsHelper.height;
    const width = widthFromProps ?? DimensionsHelper.width;

    if (
      DimensionsHelper.height !== height ||
      DimensionsHelper.width !== width
    ) {
      DimensionsHelper.listeners.forEach((listener) => {
        listener(height, width);
      });
    }

    DimensionsHelper.height = height;
    DimensionsHelper.width = width;
  },
};

export default Dimensions;

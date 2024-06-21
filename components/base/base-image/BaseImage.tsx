import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import {
  ImageProps,
  ImageStyle,
  StyleProp,
  Image as ReactNativeImage,
  Platform,
} from 'react-native';

export type BaseImageProps = Omit<FastImageProps & ImageProps, 'style'> & {
  style: StyleProp<ImageStyle>;
};

export const BaseImage: React.FC<BaseImageProps> = ({ ...props }) => {
  const Image = (
    Platform.OS === 'android' ? FastImage : ReactNativeImage
  ) as any;

  return <Image {...props} />;
};

import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { Blurhash } from 'react-native-blurhash';
import { ImageStyle, StyleProp, View } from 'react-native';
import {
  BaseImage,
  BaseImageProps,
} from 'components/base/base-image/BaseImage';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import { BASE_BLURHASH } from '@utils';
import { Status } from '@types';

type BaseBlurImageProps = {
  uri: string;
  imageProps?: Partial<BaseImageProps>;
  imageStyle?: StyleProp<ImageStyle>;
  onLoadSuccess?: () => void;
  onLoadStart?: () => void;
  gray?: boolean;
};

const BaseBlurImage: React.FC<BaseBlurImageProps> = ({
  uri,
  imageProps,
  imageStyle,
  onLoadSuccess: onLoadSuccessCallback,
  onLoadStart: onLoadStartCallback,
  gray = false,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const [status, setStatus] = React.useState<Status>(undefined);

  const onLoadStart = () => {
    onLoadStartCallback?.();
    setStatus('loading');
  };

  const onLoadEnd = () => {
    onLoadSuccessCallback?.();
    setStatus('success');
  };

  const onError = () => {
    setStatus('failure');
  };

  const withGrayscale = (children: React.ReactNode) => {
    return gray ? <Grayscale>{children}</Grayscale> : children;
  };

  return status !== 'failure' ? (
    <View style={styles.imageContainer}>
      <View style={[styles.blurhashContainer, imageStyle]}>
        {withGrayscale(
          <Blurhash resizeMode={'cover'} blurhash={BASE_BLURHASH[theme]} />,
        )}
      </View>
      {withGrayscale(
        <BaseImage
          onError={onError}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          style={imageStyle}
          resizeMode={'cover'}
          source={{ uri }}
          {...imageProps}
        />,
      )}
    </View>
  ) : (
    <View style={styles.emptyImage} />
  );
};

export default BaseBlurImage;

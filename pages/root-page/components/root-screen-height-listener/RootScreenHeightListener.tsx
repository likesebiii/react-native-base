import React from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { Dimensions, MMKVStorage } from '@services';

type RootScreenHeightListenerProps = {};

const ABS_INTERVAL = 3;

const RootScreenHeightListener: React.FC<
  RootScreenHeightListenerProps
> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const onLayout = (ev: LayoutChangeEvent) => {
    const screenHeight = MMKVStorage.getValue('screen_height');
    const eventScreenHeightString = ev.nativeEvent.layout.height.toFixed(0);
    const eventScreenHeight = parseFloat(eventScreenHeightString);

    if (
      !screenHeight ||
      Math.abs(eventScreenHeight - screenHeight) <= ABS_INTERVAL
    ) {
      MMKVStorage.setValue('screen_height', eventScreenHeight);
      Dimensions.update({
        height: eventScreenHeight,
      });
    }
  };

  return Platform.OS === 'android' ? (
    <View style={styles.absoluteFillObject} onLayout={onLayout} />
  ) : null;
};

export default RootScreenHeightListener;

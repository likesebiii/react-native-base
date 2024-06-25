import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseImage } from 'components/base/base-image/BaseImage';
import { interpolate } from 'react-native-reanimated';

interface BattleAvatarProps {
  size?: number;
}

const AVATAR_PHOTO = require('resources/assets/avatar.jpg');

const BattleAvatar: React.FC<BattleAvatarProps> = ({ size = 80 }) => {
  const {} = useBaseAspect(aspectStyle);

  const borderWidth = interpolate(size, [24, 80], [1.5, 3.5]);

  return (
    <View
      style={{
        width: size + 2 * borderWidth,
        height: size + 2 * borderWidth,
        borderRadius: size / 4 + borderWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: size + 2 * borderWidth,
          height: size + 2 * borderWidth,
          borderRadius: size / 4 + borderWidth,
          backgroundColor: '#9BC2D3',
        }}
      />
      <BaseImage
        source={AVATAR_PHOTO}
        style={{ width: size, height: size, borderRadius: size / 4 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default BattleAvatar;

import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import { BASE_BOTTOM_BAR_HEIGHT } from '@utils';
import { BattleSvg } from '@svgs';

interface BattleButtonProps {}

const BattleButton: React.FC<BattleButtonProps> = ({}) => {
  const {} = useBaseAspect(aspectStyle);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: BASE_BOTTOM_BAR_HEIGHT + 24,
        left: 0,
        right: 0,
      }}>
      <BasePrimaryButton title={'NEW BATTLE'} leftComponent={<BattleSvg />} />
    </View>
  );
};

export default BattleButton;

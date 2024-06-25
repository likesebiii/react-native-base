import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { colors } from '@theme';
import { BattlesPlaceholderSvg } from '@svgs';

interface BattleActivePlaceholderProps {}

const BattleActivePlaceholder: React.FC<
  BattleActivePlaceholderProps
> = ({}) => {
  const { theme } = useBaseAspect(aspectStyle);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{ marginRight: 24 }}>
        <BattlesPlaceholderSvg />
      </View>
      <BaseText
        style={{
          color: colors[theme].text.primary,
          flex: 1,
        }}>
        {
          'Your active battles will appear here.\nTo start one, pick an opponent from below or tap on '
        }
        <BaseText type={'texturina-14-semi-bold'}>{'NEW BATTLE'}</BaseText>
        {'.'}
      </BaseText>
    </View>
  );
};

export default BattleActivePlaceholder;

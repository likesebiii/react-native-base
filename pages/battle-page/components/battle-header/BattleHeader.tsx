import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { colors, sizing } from '@theme';
import BattleAvatar from '../battle-avatar/BattleAvatar';
import { DefeatSvg, VictorySvg } from '@svgs';
import { useSelectRedux } from '@services';

interface BattleHeaderProps {}

const BattleHeader: React.FC<BattleHeaderProps> = ({}) => {
  const { theme } = useBaseAspect(aspectStyle);

  const { username } = useSelectRedux('current', 'currentUser', ['username']);

  return (
    <View style={{ flexDirection: 'row' }}>
      <BattleAvatar size={96} />
      <View style={{ marginLeft: 24 }}>
        <BaseText
          type={'jockey-30'}
          style={{ color: colors[theme].text.primary }}>
          {username}
        </BaseText>
        <View style={{ flexDirection: 'row', marginTop: sizing.xxs }}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <VictorySvg />
              <BaseText
                type={'jockey-24'}
                style={{
                  color: colors[theme].text.primary,
                  marginLeft: 4,
                }}>
                {24}
              </BaseText>
            </View>
            <BaseText
              type={'jockey-20'}
              style={{
                color: colors[theme].text.primary,
              }}>
              {'VICTORIES'}
            </BaseText>
          </View>
          <View style={{ marginLeft: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <DefeatSvg />
              <BaseText
                type={'jockey-24'}
                style={{
                  color: colors[theme].text.primary,
                  marginLeft: 2,
                }}>
                {32}
              </BaseText>
            </View>
            <BaseText
              type={'jockey-20'}
              style={{
                color: colors[theme].text.primary,
              }}>
              {'DEFEATS'}
            </BaseText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BattleHeader;

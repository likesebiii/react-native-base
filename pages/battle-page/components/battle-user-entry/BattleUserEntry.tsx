import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { colors } from '@theme';
import BattleAvatar from '../battle-avatar/BattleAvatar';
import { BaseButton } from 'components/base/base-button/BaseButton';
import { VictorySvg } from '@svgs';
import { NAVIGATION_CONTROLLER } from 'services/navigation';

interface BattleUserEntryProps {
  style?: StyleProp<ViewStyle>;
}

const BattleUserEntry: React.FC<BattleUserEntryProps> = ({ style }) => {
  const { theme } = useBaseAspect(aspectStyle);

  const onBattlePress = () => {
    NAVIGATION_CONTROLLER.navigate('fk.BattleGamePage', {});
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          maxWidth: '60%',
          paddingRight: 20,
        }}>
        <BattleAvatar size={48} />
        <View style={{ marginLeft: 12 }}>
          <BaseText
            type={'jockey-20'}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            style={{
              color: colors[theme].text.primary,
            }}>
            {'Sebi The Gambler'}
          </BaseText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <VictorySvg height={16} width={16} />
            <BaseText
              type={'texturina-16-regular'}
              style={{
                marginLeft: 4,
                color: colors[theme].text.secondary,
              }}>
              {'55 victories'}
            </BaseText>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', maxWidth: '40%' }}>
        <BaseButton
          buttonStyle={{
            width: 84,
            height: 32,
            paddingHorizontal: 0,
            paddingVertical: 0,
            backgroundColor: '#E54B79',
          }}
          onPress={onBattlePress}>
          <BaseText
            type={'texturina-14-semi-bold'}
            style={{
              color: colors[theme].main.inverted,
            }}>
            {'BATTLE'}
          </BaseText>
        </BaseButton>
      </View>
    </View>
  );
};

export default BattleUserEntry;

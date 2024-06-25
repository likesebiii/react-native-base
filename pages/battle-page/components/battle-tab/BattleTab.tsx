import React from 'react';
import { ScrollView, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import BattleHeader from '../battle-header/BattleHeader';
import { BaseText } from 'components/base/base-text/BaseText';
import { colors } from '@theme';
import { useUserGames } from 'pages/battle-page/hooks/useUserGames';
import BattleUserEntry from '../battle-user-entry/BattleUserEntry';
import BattleActivePlaceholder from '../battle-active-placeholder/BattleActivePlaceholder';
import BattleButton from '../battle-button/BattleButton';

interface BattleTabProps {}

const BattleTab: React.FC<BattleTabProps> = ({}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const {} = useUserGames();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <BattleHeader />
        <View style={{ marginTop: 48 }}>
          <BaseText
            type={'jockey-24'}
            style={{
              color: colors[theme].text.primary,
            }}>
            {'Active Battles'}
          </BaseText>
          <View style={{ marginTop: 24 }}>
            <BattleActivePlaceholder />
          </View>
        </View>
        <View style={{ marginTop: 48 }}>
          <BaseText
            type={'jockey-24'}
            style={{
              color: colors[theme].text.primary,
            }}>
            {'Finished Battles'}
          </BaseText>
        </View>
        <View style={{ marginTop: 48 }}>
          <BaseText
            type={'jockey-24'}
            style={{
              color: colors[theme].text.primary,
            }}>
            {'Recently Active Players'}
          </BaseText>
          <BattleUserEntry style={{ marginTop: 24 }} />
        </View>
      </ScrollView>
      <BattleButton />
    </View>
  );
};

export default BattleTab;

import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import BattleTab from './components/battle-tab/BattleTab';

export interface BattlePageProps {}

const BattlePage: React.FC<BattlePageProps & PageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <Page style={styles.container}>
      <BattleTab />
    </Page>
  );
};

export default BattlePage;

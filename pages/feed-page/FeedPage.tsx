import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import FeedTab from './components/feed-tab/FeedTab';

export interface FeedPageProps {}

const FeedPage: React.FC<FeedPageProps & PageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <Page style={styles.container}>
      <FeedTab />
    </Page>
  );
};

export default FeedPage;

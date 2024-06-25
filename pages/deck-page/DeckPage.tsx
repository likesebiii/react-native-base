import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import { View } from 'react-native';
import DeckList, { DeckListProps } from './deck-list/DeckList';

export type DeckPageProps = {
  title?: string;
  disableNavigation?: boolean;
  header?: JSX.Element;
} & DeckListProps;

const DeckPage: React.FC<DeckPageProps & PageProps> = ({
  title,
  header,
  disableNavigation,
  ...deckListProps
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <Page
      style={styles.container}
      navigation={
        disableNavigation
          ? undefined
          : {
              type: 'rebrand',
              title: title ?? 'Deck',
            }
      }>
      <View style={styles.sectionList}>
        <DeckList header={header} {...deckListProps} />
      </View>
    </Page>
  );
};

export default DeckPage;

import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import TopicsList from 'pages/welcome-page/components/welcome-page-onboarding/components/welcome-page-onboarding-pick-scene/topics-list/TopicsList';
import { TopicContentKeyType } from '@utils';
import { useSelectVortex, Vortex } from '@services';

type SettingsInterestsPageProps = {};

const SettingsInterestsPage: React.FC<
  SettingsInterestsPageProps & PageProps
> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const topics = useSelectVortex('user-vortex', 'selectOnboardingTopics');

  const onChangeTopics = (topics: TopicContentKeyType[]) => {
    Vortex.dispatch('user-vortex', 'changeOnboardingProps')({ topics });
  };

  return (
    <Page
      style={styles.container}
      navigation={{
        type: 'rebrand',
        title: 'Interests',
      }}>
      <TopicsList
        style={styles.list}
        listStyle={styles.listStyle}
        initialTopics={topics as TopicContentKeyType[]}
        onChangeTopics={onChangeTopics}
      />
    </Page>
  );
};

export default SettingsInterestsPage;

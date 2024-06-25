import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { ScrollView } from 'react-native';
import SettingsEntry from 'components/settings/settings-entry/SettingsEntry';
import { EMPTY_FUNCTION } from '@utils';
import { Application, Vortex } from '@services';
import Toast from 'react-native-toast-message';

export interface SettingsDeveloperMenuPageProps {}

const SettingsDeveloperMenuPage: React.FC<
  SettingsDeveloperMenuPageProps & PageProps
> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const onResetReviewedQuestions = () => {
    Vortex.dispatch('user-vortex', 'resetSkippedQuestions')();
    Toast.show({
      type: 'success',
      text1: 'Successfully reset reviewed questions',
      swipeable: false,
    });
  };

  const onInfiniteLivesPress = () => {
    Vortex.dispatch('user-vortex', 'setUserLives')(999);
    Toast.show({
      type: 'success',
      text1: 'Successfully added infinite lives',
      swipeable: false,
    });
  };

  const onSetLivesZeroPress = () => {
    Vortex.dispatch('user-vortex', 'setUserLives')(0);
    Toast.show({
      type: 'success',
      text1: 'Successfully decreased lives',
      swipeable: false,
    });
  };

  const onReviewContent = () => {
    NAVIGATION_CONTROLLER.navigate('fk.SettingsDeveloperReviewContentPage', {});
  };

  const onInterestsPress = () => {
    NAVIGATION_CONTROLLER.navigate('fk.SettingsInterestsPage', {});
  };

  return (
    <Page
      style={styles.container}
      navigation={{
        type: 'rebrand',
        title: 'Developer Menu',
        backHandler: true,
      }}>
      <ScrollView style={styles.list}>
        <SettingsEntry
          title={`App build number: ${Application.getCurrentBuildNumber()}`}
          onPress={EMPTY_FUNCTION}
        />
        <SettingsEntry
          title={'Add infinite lives'}
          onPress={onInfiniteLivesPress}
        />
        <SettingsEntry title={'Set lives to 0'} onPress={onSetLivesZeroPress} />
        <SettingsEntry
          title={'Reset reviewed questions'}
          onPress={onResetReviewedQuestions}
        />
        <SettingsEntry
          title={'Navigate to Review Content'}
          onPress={onReviewContent}
        />
        <SettingsEntry
          title={'Change interests for review'}
          onPress={onInterestsPress}
        />
      </ScrollView>
    </Page>
  );
};

export default SettingsDeveloperMenuPage;

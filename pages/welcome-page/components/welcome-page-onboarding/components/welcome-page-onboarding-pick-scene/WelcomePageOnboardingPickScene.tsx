import React from 'react';
import { View } from 'react-native';
import { useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageOnboardingTitle from '../welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import WelcomePageOnboardingBottomButton from '../welcome-page-onboarding-bottom-button/WelcomePageOnboardingBottomButton';
import { TopicContentKeyType } from '@utils';
import TopicsList from './topics-list/TopicsList';
import { Analytics, Vortex } from '@services';

type WelcomePageOnboardingPickSceneProps = {
  onContinue?: () => void;
};

const WelcomePageOnboardingPickScene: React.FC<
  WelcomePageOnboardingPickSceneProps
> = ({ onContinue }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [topics, setTopics, topicsRef] = useBaseStateAndRef<
    TopicContentKeyType[]
  >([]);

  const onContinuePress = () => {
    Analytics.log(
      'onboardingContinueStep',
      { type: 'pick', topics: [...topicsRef.current] },
      ['amplitude'],
    );
    Vortex.dispatch(
      'user-vortex',
      'changeOnboardingProps',
    )({ topics: [...topicsRef.current] });
    setTimeout(() => {
      onContinue?.();
    });
  };

  React.useEffect(() => {
    Analytics.log('onboardingStep', { type: 'pick' }, ['amplitude']);
  }, []);

  return (
    <View style={styles.container}>
      <TopicsList onChangeTopics={setTopics} />
      <WelcomePageOnboardingTitle subtitle={'Pick your topics'} step={'3'} />
      <WelcomePageOnboardingBottomButton
        onPress={onContinuePress}
        title={`Pick ${
          topics.length == 0 ? 'at least 1' : topics.length
        } topic${topics.length < 1 ? '' : 's'}`}
        tip={'Pick as many as you like.'}
        state={topics.length === 0 ? 'disabled' : 'enabled'}
      />
    </View>
  );
};

export default WelcomePageOnboardingPickScene;

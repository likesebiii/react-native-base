import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import {
  ACTIVE_OPACITY,
  TOPIC_CONTENT,
  TOPIC_CONTENT_QUESTIONS,
  TopicContentKeyType,
  changeOpacityOfRgbaColor,
  hexColorToRgba,
} from '@utils';
import TopicPageWrapper from 'pages/topic-page/TopicPage';
import WelcomePageOnboardingTitle from '../welcome-page-onboarding-title/WelcomePageOnboardingTitle';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { Analytics, Vortex } from '@services';
import { BaseText } from 'components/base/base-text/BaseText';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '@theme';
import { interpolate } from 'react-native-reanimated';
import BaseSocialButtons from 'components/base/base-social-buttons/BaseSocialButtons';
import BaseTermsOfService from 'components/base/base-terms-of-service/BaseTermsOfService';

const getInterestsText = (interests: TopicContentKeyType[]) => {
  let text = '';
  let count = 0;

  interests.forEach((interest) => {
    const key = Object.keys(TOPIC_CONTENT).find(
      (key) => TOPIC_CONTENT[key as any]?.key === interest,
    );

    if (key) {
      if (count === 0) {
        text = text + TOPIC_CONTENT[key as never].title;
        count = 1;
      } else if (count === 1) {
        text =
          text +
          (interests.length === 2 ? ' and ' : ', ') +
          TOPIC_CONTENT[key as never].title;
        count = 2;
      }
    }
  });

  if (count === 2) {
    if (interests.length > 2) {
      const diff = interests.length - 2;

      text = text + ` and ${diff} more interest${diff === 1 ? '' : 's'}`;
    }
  }

  return text;
};
type WelcomePageOnboardingSignupSceneProps = {
  onContinue?: () => void;
  disableSkip?: boolean;
};

const WelcomePageOnboardingSignupScene: React.FC<
  WelcomePageOnboardingSignupSceneProps
> = ({ disableSkip = false }) => {
  const { styles, theme, screenHeight } = useBaseAspect(aspectStyle);

  const interests = React.useMemo(
    () =>
      (Vortex.getObject('user-vortex').onboarding.topics ??
        []) as TopicContentKeyType[],
    [],
  );

  const text = React.useMemo(
    () =>
      getInterestsText(interests.length === 0 ? ['world-wonders'] : interests),
    [],
  );

  const cardId = React.useMemo(() => {
    const key = Object.keys(TOPIC_CONTENT).find(
      (key) => TOPIC_CONTENT[key as any]?.key === interests[0],
    );
    const object = TOPIC_CONTENT[key as any];

    return object?.data?.[2]?.questions[0];
  }, []);

  const onSkipPress = () => {
    Analytics.log(
      'tapElement',
      {
        location: 'welcome-page-onboarding-sign-up',
        element: 'skip',
      },
      ['amplitude'],
    );
    Vortex.dispatch('user-vortex', 'setNSIState')(true);
    NAVIGATION_CONTROLLER.setRoot('fk.RootPage');
  };

  React.useEffect(() => {
    Analytics.log('onboardingStep', { type: 'sign-up' }, ['amplitude']);
  }, []);

  return (
    <View style={styles.container}>
      {disableSkip ? undefined : (
        <View style={styles.skip}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={onSkipPress}>
            <BaseText
              type={'jockey-20'}
              style={{ color: colors[theme].text.primary }}>
              {'SKIP'}
            </BaseText>
          </TouchableOpacity>
        </View>
      )}
      <TopicPageWrapper
        cardHeight={interpolate(screenHeight, [667, 860], [200, 400])}
        bottomInset={interpolate(screenHeight, [667, 860], [150, 100])}
        style={styles.removeBackground}
        disableTopBar
        disableStreakBar
        disableAnswers
        disableGestures
        difficulty={1}
        lastCardEnabled={false}
        footerComponent={
          <WelcomePageOnboardingTitle
            illustrationType={'profile'}
            title={'Your deck is ready'}
            subtitle={'Sign up to save it'}
            disableStep
          />
        }
        contentFromProps={[
          {
            ...TOPIC_CONTENT_QUESTIONS[cardId ?? 42],
            title: `Your deck of\n247 cards about\n${text}` as any,
          },
          TOPIC_CONTENT_QUESTIONS[-1],
        ]}
        disableLivesBlocking
        disableAnalytics
        disableTopbarTap
      />
      <View style={styles.bottomContainer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.1, 1]}
          colors={[
            changeOpacityOfRgbaColor(
              hexColorToRgba(colors[theme].main.primaryBackground),
              0.0,
            ),
            colors[theme].main.primaryBackground,
            colors[theme].main.primaryBackground,
          ]}
          style={styles.gradient}
        />
        <View style={styles.buttons}>
          <BaseSocialButtons authenticateType={'sign-up'} email />
          <BaseTermsOfService />
        </View>
      </View>
    </View>
  );
};

export default WelcomePageOnboardingSignupScene;

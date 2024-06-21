import React from 'react';
import { useBaseBackPress, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import {
  AchievementCardType,
  TOPIC_CONTENT,
  TopicCardContentType,
  TopicContentDifficultyType,
  TopicContentKeyType,
  getAchievementCard,
  getAvailableDifficultyForTopic,
  getAvailableTopicsAtTheEnd,
  getQuestionType,
  getQuestionsForTopic,
} from 'utils/content';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { StyleProp, View, ViewStyle } from 'react-native';
import TopicCard from './components/topic-card/TopicCard';
import TopicProvider from './context/TopicProvider';
import { useTopicContext } from './context/useTopicContext';
import TopicCardPlaceholders from './components/topic-card-placeholders/TopicCardPlaceholders';
import FeedTopBar from 'pages/feed-page/components/feed-top-bar/FeedTopBar';
import TopicPageHeader from './components/topic-page-header/TopicPageHeader';
import { useTopicContent } from './hooks/useTopicContent';
import { TOPIC_CONTENT_QUESTIONS } from '@utils';
import TopicPageFooter from './components/topic-page-footer/TopicPageFooter';
import { Analytics } from '@services';
import { FunctionalComponent } from '@types';
import { FEED_TAB_CONTROLLER } from 'pages/feed-page/components/feed-tab/FeedTab';

export type TopicPageProps = {
  type?: TopicContentKeyType;
  style?: StyleProp<ViewStyle>;
  difficulty?: TopicContentDifficultyType;
  bottomInset?: number;
  disableTopBar?: boolean;
  disableStreakBar?: boolean;
  contentFromProps?: TopicCardContentType[];
  onAnswer?: (correct: boolean, answer: string) => void;
  onSwipe?: () => void;
  onSwipeDown?: (
    type: TopicContentKeyType | undefined,
    difficulty: TopicContentDifficultyType,
  ) => void;
  headerComponent?: JSX.Element;
  footerComponent?: JSX.Element;
  topic?: string;
  enableVerticalSwipe?: boolean;
  disableAnswers?: boolean;
  disableGestures?: boolean;
  disableHorizontalGestures?: boolean;
  disableUpGesture?: boolean;
  lastCardEnabled?: boolean;
  fromQuestion?: number;
  disableLivesBlocking?: boolean;
  cardHeight?: number;
  disableAnalytics?: boolean;
  disableTopbarTap?: boolean;
  onTapStart?: () => void;
};

const TopicPage: FunctionalComponent<TopicPageProps> = ({
  type = 'world-wonders',
  style,
  bottomInset = 0,
  disableStreakBar = false,
  disableTopBar = false,
  contentFromProps,
  footerComponent,
  headerComponent,
  enableVerticalSwipe,
  onSwipe,
  onAnswer,
  onSwipeDown,
  topic,
  disableAnswers = false,
  disableGestures = false,
  disableHorizontalGestures = false,
  disableUpGesture = false,
  lastCardEnabled = true,
  fromQuestion,
  disableLivesBlocking = false,
  difficulty,
  cardHeight,
  disableAnalytics = false,
  disableTopbarTap = false,
  children,
  onTapStart,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { backPressed } = useTopicContext();

  const close = () => {
    backPressed.value = 1.0;
    NAVIGATION_CONTROLLER.close();
  };

  const { onSwipeCallback, content, fullContent, progress, length } =
    useTopicContent({
      type,
      onSwipe,
      contentFromProps,
      fromQuestion,
    });

  if (content === undefined) {
    return null;
  }

  const lastCard = React.useMemo(() => {
    const contentIndex = TOPIC_CONTENT.findIndex(
      (content) => content.key === (type ?? 'world-wonders'),
    );
    const availableTopics = getAvailableTopicsAtTheEnd({ index: contentIndex });

    return {
      ...TOPIC_CONTENT_QUESTIONS[-3],
      answers: [
        availableTopics[0].title,
        availableTopics[1].title,
        availableTopics[2].title,
        availableTopics[3].title,
      ],
    };
  }, []);

  const [achievementCard, setAchievementCard] =
    React.useState<AchievementCardType>();

  const lastCards = [
    ...(achievementCard ? [achievementCard] : []),
    ...(lastCardEnabled ? [lastCard] : []),
    ...(lastCardEnabled ? [TOPIC_CONTENT_QUESTIONS[-1]] : []),
  ];

  const contentForProps = [...content, ...lastCards];

  const onAnswerCallback = (
    correct: boolean,
    _: string,
    questionId: number,
  ) => {
    if (correct) {
      FEED_TAB_CONTROLLER.filterContent?.({ questionId });

      const topic = getQuestionType(questionId);

      if (topic) {
        const achievement = getAchievementCard({ topic });

        if (achievement.upgrade) {
          setTimeout(() => {
            setAchievementCard(achievement);

            const content = getQuestionsForTopic({ topic });
            // Add new content into feed
            FEED_TAB_CONTROLLER.addContent?.(content);
          }, 250);
        }
      }
    }
  };

  const topicCardProps = {
    type: contentFromProps ? undefined : type,
    content: contentForProps,
    fullContent,
    bottomInset,
    onAnswer,
    onAnswerCallback,
    onSwipe: onSwipeCallback,
    onSwipeDown,
    enableVerticalSwipe,
    disableAnswers,
    disableGestures,
    disableHorizontalGestures,
    disableUpGesture,
    topic,
    disableLivesBlocking,
    cardHeight,
    onTapStart,
  };

  const topbar = {
    onClose: close,
    containerStyle: styles.icon,
    titleComponent: (
      <TopicPageHeader progress={progress} type={type} length={length} />
    ),
  };

  React.useEffect(() => {
    if (!disableAnalytics) {
      Analytics.log(
        'openTopicPage',
        { topic, difficulty, fromQuestion, type },
        ['amplitude'],
      );
    }
  }, []);

  useBaseBackPress(close, []);

  return (
    <Page
      style={[styles.container, style]}
      navigation={disableTopBar ? undefined : topbar}>
      <View
        style={[
          styles.cardsContainer,
          {
            bottom: bottomInset ?? 0,
          },
        ]}>
        <TopicCardPlaceholders cardHeight={cardHeight} />
        {headerComponent}
        {disableStreakBar ? undefined : (
          <FeedTopBar bottomInset={bottomInset} disableTap={disableTopbarTap} />
        )}
        {children}
        <TopicCard count={0} {...(topicCardProps as any)} />
        <TopicCard count={1} {...(topicCardProps as any)} />
        <TopicCard count={2} {...(topicCardProps as any)} />
        {footerComponent}
        <TopicPageFooter fullContent={fullContent} />
      </View>
    </Page>
  );
};

const TopicPageWrapper: FunctionalComponent<TopicPageProps> = (props) => {
  const content = TOPIC_CONTENT.find(
    (content) => content.key === (props.type ?? 'world-wonders'),
  );
  const availableDifficulty = getAvailableDifficultyForTopic({
    topic: props.type ?? 'world-wonders',
  });
  const difficulty =
    props.difficulty ?? (availableDifficulty === -1 ? 3 : availableDifficulty);

  return (
    <TopicProvider
      topic={props.topic ?? content?.topic ?? ''}
      difficulty={difficulty}>
      <TopicPage {...props} difficulty={difficulty} />
    </TopicProvider>
  );
};

TopicPageWrapper.displayName = 'TopicPageWrapper';

export default TopicPageWrapper;

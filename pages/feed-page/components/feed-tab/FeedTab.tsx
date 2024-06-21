import React from 'react';
import { View } from 'react-native';
import { useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import TopicProvider from 'pages/topic-page/context/TopicProvider';
import TopicCard from 'pages/topic-page/components/topic-card/TopicCard';
import TopicCardPlaceholders from 'pages/topic-page/components/topic-card-placeholders/TopicCardPlaceholders';
import {
  ContentRecommendationsType,
  MISSED_QUESTION_ID,
  TopicCardContentType,
  TopicContentDifficultyType,
  TopicContentKeyType,
  getAchievementCard,
  getAvailableTopicsAtTheEnd,
  getQuestionType,
  getQuestionsForTopic,
  getQuestionsRecommendation,
} from 'utils/content';
import FeedBottomBar, {
  FEED_BOTTOM_BAR_CONTROLLER,
} from '../feed-bottom-bar/FeedBottomBar';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { TOPIC_CONTENT_QUESTIONS } from '@utils';

interface FeedTabProps {
  bottomInset?: number;
}

export const FEED_TAB_CONTROLLER: {
  changeQuestionMark?: (visible: boolean) => void;
  filterContent?: (params: { questionId: number }) => void;
  addContent?: (content: ContentRecommendationsType[]) => void;
} = {};

const FeedTab: React.FC<FeedTabProps> = ({ bottomInset = 0 }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [questionMark, setQuestionMark] = React.useState(true);

  const lastCards: (TopicCardContentType & {
    difficulty: TopicContentDifficultyType;
    topic: string;
  })[] = React.useMemo(() => {
    const availableTopics = getAvailableTopicsAtTheEnd({ index: 0 });

    return [
      {
        ...TOPIC_CONTENT_QUESTIONS[-4],
        answers: [
          availableTopics[0].title,
          availableTopics[1].title,
          availableTopics[2].title,
          availableTopics[3].title,
        ],
        difficulty: 1,
        topic: 'FINISHED',
      },
      { ...TOPIC_CONTENT_QUESTIONS[-1], topic: 'world-wonders', difficulty: 1 },
    ] as never as (TopicCardContentType & {
      difficulty: TopicContentDifficultyType;
      topic: string;
    })[];
  }, [questionMark]);

  const [content, setContent, contentRef] = useBaseStateAndRef([
    ...getQuestionsRecommendation({}),
    ...lastCards,
  ]);
  const indexRef = React.useRef(0);

  const onSwipeDown = (
    type: TopicContentKeyType | undefined,
    difficulty: TopicContentDifficultyType,
    element: TopicCardContentType,
  ) => {
    const swipeElement = content[indexRef.current];

    if (
      swipeElement.id === (MISSED_QUESTION_ID as never) &&
      swipeElement.type === 'achievement'
    ) {
      const question = content[indexRef.current - 1];
      // Check if the content is really a question
      if (question && question.id && question.type === 'question') {
        const type = getQuestionType(question.id);

        NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
          type,
          difficulty: swipeElement.difficulty ?? question.difficulty,
          lastCardEnabled: true,
          fromQuestion: question.id,
        });
      }
    } else {
      NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
        type,
        difficulty,
        lastCardEnabled: true,
        fromQuestion: element.type === 'question' ? element.id : undefined,
      });
    }
  };

  const changeQuestionMark = React.useCallback((visible: boolean) => {
    setQuestionMark(visible);
  }, []);

  const onSwipe = () => {
    // Do not increment the index if we've reached the end
    if (content[indexRef.current]?.id === -4) {
      return;
    }
    // Increment index
    // to keep an evidence
    // in order to correctly insert the new element
    indexRef.current = indexRef.current + 1;
    // Check if it's the last element
    if (content[indexRef.current]?.id === -4) {
      changeQuestionMark(false);
    }
  };

  const onTapStart = () => {
    FEED_BOTTOM_BAR_CONTROLLER.questionAnimate?.('stop');
  };

  const filterContent = React.useCallback(
    ({ questionId }: { questionId: number }) => {
      const contentFiltered = contentRef.current.filter((item, index) => {
        // Do not filter items that are not in focus
        if (index < indexRef.current) {
          return true;
        }

        return item.id !== questionId;
      });

      setContent(contentFiltered);
    },
    [],
  );

  const addContent = React.useCallback(
    (content: ContentRecommendationsType[]) => {
      setContent([
        ...contentRef.current.slice(0, indexRef.current + 1),
        ...content,
        ...contentRef.current.slice(indexRef.current + 1),
      ]);
    },
    [],
  );

  const onAnswerCallback = (correct: boolean) => {
    const topic = getQuestionType(contentRef.current[indexRef.current].id);

    if (topic) {
      const achievement = getAchievementCard({
        title: content[indexRef.current].title,
        topic,
        state: correct ? 'correct' : 'wrong',
      });

      setContent([
        ...contentRef.current.slice(0, indexRef.current + 1),
        achievement,
        ...contentRef.current.slice(indexRef.current + 1),
      ] as any);
      // Animate the question mark
      if (!achievement.upgrade && correct === false) {
        setTimeout(() => {
          FEED_BOTTOM_BAR_CONTROLLER.questionAnimate?.('animate');
        });
      } else {
        // If it's an upgrade achievement
        setTimeout(() => {
          const content = getQuestionsForTopic({ topic });
          // Add new content into feed
          addContent(content);
        }, 250);
      }
    }
  };

  React.useEffect(() => {
    FEED_TAB_CONTROLLER.changeQuestionMark = changeQuestionMark;
    FEED_TAB_CONTROLLER.filterContent = filterContent;
    FEED_TAB_CONTROLLER.addContent = addContent;

    return () => {
      if (changeQuestionMark === FEED_TAB_CONTROLLER.changeQuestionMark) {
        FEED_TAB_CONTROLLER.changeQuestionMark = undefined;
      }

      if (filterContent === FEED_TAB_CONTROLLER.filterContent) {
        FEED_TAB_CONTROLLER.filterContent = undefined;
      }

      if (addContent === FEED_TAB_CONTROLLER.addContent) {
        FEED_TAB_CONTROLLER.addContent = undefined;
      }
    };
  }, []);

  return (
    <TopicProvider>
      <View style={styles.cardsContainer}>
        <View
          style={[
            styles.secondContainer,
            {
              bottom: bottomInset ?? 0,
            },
          ]}>
          {questionMark ? (
            <FeedBottomBar bottomInset={bottomInset} />
          ) : undefined}
          <TopicCard
            bottomInset={bottomInset}
            content={content}
            count={0}
            enableVerticalSwipe
            instantAnswersOpacity
            onSwipeDown={onSwipeDown}
            onTapStart={onTapStart}
            onAnswerCallback={onAnswerCallback}
            onSwipe={onSwipe}
          />
          <TopicCard
            bottomInset={bottomInset}
            content={content}
            count={1}
            enableVerticalSwipe
            instantAnswersOpacity
            onSwipeDown={onSwipeDown}
            onTapStart={onTapStart}
            onAnswerCallback={onAnswerCallback}
            onSwipe={onSwipe}
          />
          <TopicCard
            bottomInset={bottomInset}
            content={content}
            count={2}
            enableVerticalSwipe
            instantAnswersOpacity
            onSwipeDown={onSwipeDown}
            onTapStart={onTapStart}
            onAnswerCallback={onAnswerCallback}
            onSwipe={onSwipe}
          />
          <TopicCardPlaceholders />
        </View>
      </View>
    </TopicProvider>
  );
};

export default FeedTab;

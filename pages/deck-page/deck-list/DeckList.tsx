import React from 'react';
import { Platform, TouchableOpacity, View, Text } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import {
  TopicContentDifficultyType,
  TopicContentKeyType,
  getUserDeckContent,
  getQuestionContent,
  UserQuestionsType,
  ACTIVE_OPACITY,
  MAX_TEXT_SIZE_MULTIPLIER,
} from '@utils';
import { BasePressableScale } from 'components/base/base-pressable-scale/BasePressableScale';
import TopicQuestionCard from 'pages/topic-page/components/topic-question-card/TopicQuestionCard';
import TopicAchievementCard from 'pages/topic-page/components/topic-achievement-card/TopicAchievementCard';
import { FlatList } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';

export interface DeckListProps {
  header?: JSX.Element;
  topic?: TopicContentKeyType;
  difficulties?: TopicContentDifficultyType[];
  achievements?: boolean;
  filterUnlockedAchievements?: boolean;
  filterQuestions?: boolean;
}

const DeckList: React.FC<DeckListProps> = ({
  header,
  topic,
  difficulties,
  achievements,
  filterUnlockedAchievements,
  filterQuestions,
}) => {
  const { styles, screenWidth } = useBaseAspect(aspectStyle);

  const lastDifficulty = React.useRef<TopicContentDifficultyType | undefined>(
    1,
  );
  const lastTitle = React.useRef<string | undefined>('');
  const lastKey = React.useRef<TopicContentKeyType | undefined>(
    'world-wonders',
  );

  const data = getUserDeckContent({
    topic,
    difficulties,
    includeAchievements: achievements,
    filterUnlockedAchievements,
    filterQuestions,
  });

  const onCollectedCardPress = (
    questionId: number,
    difficulty: TopicContentDifficultyType,
    _: string,
  ) => {
    const content = getQuestionContent(questionId);

    NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
      contentFromProps: content,
      difficulty,
    });
  };

  const renderItem = React.useCallback(
    ({ item }: { item: UserQuestionsType }) => {
      if (item.type === 'questions') {
        const difficulty = lastDifficulty.current;
        const topic = lastTitle.current;
        const type = lastKey.current;

        const onFirstCollectedPress =
          difficulty && topic
            ? () =>
                onCollectedCardPress(
                  item.data[0].question.id,
                  difficulty,
                  topic,
                )
            : undefined;
        const onFirstLockedPress =
          difficulty && type
            ? () => {
                NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
                  type,
                  difficulty,
                  lastCardEnabled: true,
                  fromQuestion: item.data[0].question.id,
                });
              }
            : undefined;

        const onSecondCollectedPress =
          difficulty && topic
            ? () =>
                onCollectedCardPress(
                  item.data[1].question.id,
                  difficulty,
                  topic,
                )
            : undefined;
        const onSecondLockedPress = () => {
          NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
            type,
            difficulty,
            lastCardEnabled: true,
            fromQuestion: item.data[1].question.id,
          });
        };

        return (
          <View style={styles.questionsContainer}>
            {item.data[0] ? (
              <BasePressableScale
                onPress={
                  item.data[0].state === 'collected'
                    ? onFirstCollectedPress
                    : onFirstLockedPress
                }>
                <View
                  style={[
                    styles.firstQuestion,
                    item.data[0].state === 'locked'
                      ? { opacity: Platform.OS === 'android' ? 0.5 : 0.2 }
                      : {},
                  ]}>
                  <TopicQuestionCard
                    title={item.data[0].question.title}
                    contentHeight={((screenWidth - 64) / 2) * 1.321}
                    difficulty={lastDifficulty.current}
                  />
                </View>
              </BasePressableScale>
            ) : null}
            {item.data[1] ? (
              <BasePressableScale
                onPress={
                  item.data[1].state === 'collected'
                    ? onSecondCollectedPress
                    : onSecondLockedPress
                }>
                <View
                  style={[
                    item.data[1].state === 'locked'
                      ? { opacity: Platform.OS === 'android' ? 0.5 : 0.2 }
                      : {},
                  ]}>
                  <TopicQuestionCard
                    title={item.data[1].question.title}
                    contentHeight={((screenWidth - 64) / 2) * 1.321}
                    difficulty={lastDifficulty.current}
                  />
                </View>
              </BasePressableScale>
            ) : null}
          </View>
        );
      } else if (item.type === 'title') {
        if (item.data.key) {
          lastDifficulty.current = item.data.difficulty;
          lastTitle.current = item.data.title;
          lastKey.current = item.data.key;
        }

        const onTitlePress = item.data.key
          ? () => {
              NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
                type: item.data.key,
                difficulty: item.data.difficulty,
                lastCardEnabled: true,
              });
            }
          : undefined;

        return (
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={onTitlePress}
            disabled={!onTitlePress}>
            <View
              style={[
                styles.titleContainer,
                {
                  marginTop: item.data.index !== 0 ? 32 : 0,
                },
              ]}>
              <Text
                style={styles.title}
                maxFontSizeMultiplier={
                  MAX_TEXT_SIZE_MULTIPLIER
                }>{`${item.data.title}`}</Text>
              {item.data.difficulty ? (
                <Text
                  style={styles.difficulty}
                  maxFontSizeMultiplier={
                    MAX_TEXT_SIZE_MULTIPLIER
                  }>{`Level ${item.data.difficulty} cards`}</Text>
              ) : undefined}
            </View>
          </TouchableOpacity>
        );
      } else if (item.type === 'achievements') {
        const onFirstCollectedPress = () => {
          NAVIGATION_CONTROLLER.navigate('fk.DeckPage', {
            topic: item.data[0].achievement.action.topic,
            difficulties: [...item.data[0].achievement.action.difficulty],
            title: item.data[0].achievement.title,
          });
        };
        const onFirstLockedPress = () => {
          NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
            type: item.data[0].achievement.topic,
            difficulty: item.data[0].achievement.difficulty,
          });
        };

        const onSecondCollectedPress = () => {
          NAVIGATION_CONTROLLER.navigate('fk.DeckPage', {
            topic: item.data[1].achievement.action.topic,
            difficulties: [...item.data[1].achievement.action.difficulty],
            title: item.data[1].achievement.title,
          });
        };
        const onSecondLockedPress = () => {
          NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
            type: item.data[1].achievement.topic,
            difficulty: item.data[1].achievement.difficulty,
          });
        };

        return (
          <View style={styles.questionsContainer}>
            {item.data[0] ? (
              <BasePressableScale
                onPress={
                  item.data[0].state === 'collected'
                    ? onFirstCollectedPress
                    : onFirstLockedPress
                }>
                <View
                  style={[
                    styles.firstQuestion,
                    item.data[0].state === 'locked'
                      ? { opacity: Platform.OS === 'android' ? 0.5 : 0.2 }
                      : {},
                  ]}>
                  <TopicAchievementCard
                    title={item.data[0].achievement.title}
                    content={item.data[0].achievement.content}
                    image={item.data[0].achievement.image}
                    cardHeight={((screenWidth - 64) / 2) * 1.321}
                    unlocked={item.data[0].achievement.unlocked}
                    cardsCollected={item.data[0].achievement.cardsCollected}
                    cardsCount={item.data[0].achievement.cardsCount}
                  />
                </View>
              </BasePressableScale>
            ) : null}
            {item.data[1] ? (
              <BasePressableScale
                onPress={
                  item.data[1].state === 'collected'
                    ? onSecondCollectedPress
                    : onSecondLockedPress
                }>
                <View
                  style={[
                    item.data[1].state === 'locked'
                      ? { opacity: Platform.OS === 'android' ? 0.5 : 0.2 }
                      : {},
                  ]}>
                  <TopicAchievementCard
                    title={item.data[1].achievement.title}
                    content={item.data[1].achievement.content}
                    image={item.data[1].achievement.image}
                    unlocked={item.data[1].achievement.unlocked}
                    cardHeight={((screenWidth - 64) / 2) * 1.321}
                    cardsCollected={item.data[1].achievement.cardsCollected}
                    cardsCount={item.data[1].achievement.cardsCount}
                  />
                </View>
              </BasePressableScale>
            ) : null}
          </View>
        );
      } else {
        return null;
      }
    },
    [],
  );

  const keyExtractor = React.useCallback(
    (item: UserQuestionsType, index: number) => {
      if (item.type === 'questions') {
        return `deck-card-${index}-${item?.data?.[0]?.question.id}-${item?.data?.[0]?.state}`;
      } else if (item.type === 'title') {
        return `deck-card-title-${item?.data?.title}-${item?.data?.index}-${item?.data.difficulty}-${index}`;
      } else {
        return `deck-achievement-${index}-${item?.data?.[0]?.achievement.id}-${item?.data?.[0]?.state}`;
      }
    },
    [],
  );

  const getItemLayout = React.useCallback(
    (_: any, index: number) => ({
      length: (((screenWidth - 48) / 2) * 1.321 + 16 + 66) / 2,
      offset: ((((screenWidth - 48) / 2) * 1.321 + 16 + 66) / 2) * index,
      index,
    }),
    [],
  );

  const getItemType = (item: UserQuestionsType) => {
    // To achieve better performance, specify the type based on the item
    return item.type === 'title' ? 'sectionHeader' : 'row';
  };

  return Platform.OS === 'ios' || Platform.OS === 'android' ? (
    <FlashList
      ListHeaderComponent={header}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // When true with empty data, it causes a crash on Android
      removeClippedSubviews={Platform.OS === 'android' && data.length > 0}
      // Helps hide blank spaces when scrolling too fast, decrease if it affects performance too much
      contentContainerStyle={styles.sectionListContent}
      getItemType={getItemType}
      estimatedItemSize={(((screenWidth - 48) / 2) * 1.321 + 16 + 66) / 2}
    />
  ) : (
    <FlatList
      ListHeaderComponent={header}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // Helps hide blank spaces when scrolling too fast, decrease if it affects performance too much
      contentContainerStyle={styles.sectionListContent}
      getItemLayout={getItemLayout}
    />
  );
};

export default DeckList;

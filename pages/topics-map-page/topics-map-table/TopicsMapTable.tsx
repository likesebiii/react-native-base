import React from 'react';
import { Platform, View, ViewToken, ViewabilityConfig } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import {
  TopicAchievementType,
  TopicContentDifficultyType,
  TopicContentKeyType,
  getUserAchievements,
} from '@utils';
import TopicCardPlaceholders from 'pages/topic-page/components/topic-card-placeholders/TopicCardPlaceholders';
import TopicAchievementCard from 'pages/topic-page/components/topic-achievement-card/TopicAchievementCard';
import { getCardHeight } from 'pages/topic-page/constants';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { Analytics, useSelectVortex } from '@services';
import { FlashList } from '@shopify/flash-list';
import { colors } from '@theme';
import { Vibrations } from '@services';

type TopicsMapTableProps = {};

const VIEWABILITY_CONFIG: ViewabilityConfig = {
  waitForInteraction: false,
  minimumViewTime: 50,
  itemVisiblePercentThreshold: 50,
};

type AchievementContentType = TopicAchievementType & {
  unlocked: boolean;
  topic: TopicContentKeyType;
  difficulty: TopicContentDifficultyType;
  cardsCollected: number;
  cardsCount: number;
};

const TopicsMapTable: React.FC<TopicsMapTableProps> = ({}) => {
  const { styles, screenHeight, screenWidth, theme } =
    useBaseAspect(aspectStyle);

  const paddingHorizontal =
    (screenWidth - getCardHeight(screenHeight) * 0.75) / 3.6;
  const collectedQuestion = useSelectVortex(
    'user-vortex',
    'selectCollectedQuestions',
  );

  const initialCollectedAchievements = React.useMemo(() => {
    return getUserAchievements({}).map((item) => item.topic);
  }, []);
  const data = React.useMemo(
    () => getUserAchievements({ initialCollectedAchievements }),
    [collectedQuestion],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: AchievementContentType; index: number }) => {
      const getCardContent = () => {
        if (item.unlocked) {
          if (item.cardsCount === 0) {
            return `Way to go! You've answered every question in this topic!`;
          } else {
            return `Answer ${item.cardsCount - item.cardsCollected}${
              item.cardsCollected === 0 ? '' : ' more'
            } question${
              item.cardsCount - item.cardsCollected === 1 ? '' : 's'
            } to upgrade your achievement.`;
          }
        } else {
          return `Answer ${item.cardsCount - item.cardsCollected}${
            item.cardsCollected === 0 ? '' : ' more'
          } question${
            item.cardsCount - item.cardsCollected === 1 ? '' : 's'
          } to unlock this achievement.`;
        }
      };

      const onItemPress = () => {
        Analytics.log(
          'tapElement',
          {
            location: 'topics-map-table',
            element: 'achievement',
            state: item.unlocked ? 'unlocked' : 'locked',
          },
          ['amplitude'],
        );

        if (item.unlocked && item.cardsCount === 0) {
          NAVIGATION_CONTROLLER.navigate('fk.DeckPage', {
            topic: item.action.topic,
            difficulties: [...item.action.difficulty],
            title: item.title,
          });
        } else {
          NAVIGATION_CONTROLLER.navigate('fk.TopicPage', {
            type: item.topic,
            difficulty: item.difficulty,
            lastCardEnabled: true,
          });
        }
      };

      return (
        <View
          style={[
            styles.container,
            {
              width: screenWidth - 2 * paddingHorizontal,
            },
          ]}>
          <View style={styles.card}>
            <TouchableWithoutFeedback onPress={onItemPress}>
              <TopicAchievementCard
                title={item.title}
                content={getCardContent()}
                fill={item.color}
                image={item.image}
                unlocked={item.unlocked}
                cardsCollected={item.cardsCollected}
                cardsCount={item.cardsCount}
              />
            </TouchableWithoutFeedback>
          </View>
          <TopicCardPlaceholders />
        </View>
      );
    },
    [data],
  );

  const keyExtractor = React.useCallback(
    (item: AchievementContentType, index: number) => {
      return `topic-map-table-element-${item.id}-${index}`;
    },
    [data],
  );

  const lastIndexRef = React.useRef(0);

  const onViewableItemsChanged = React.useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      const index = viewableItems[0]?.index;

      if (index !== null && index !== undefined) {
        if (lastIndexRef.current !== index) {
          lastIndexRef.current = index;
          Vibrations.trigger('selection');
        }
      }
    },
    [],
  );

  const getItemLayout = React.useCallback(
    (_: any, index: number) => ({
      length: screenWidth - 2 * paddingHorizontal,
      offset: (screenWidth - 2 * paddingHorizontal) * index,
      index,
    }),
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors[theme].main.primaryBackground,
      }}>
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <FlashList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingHorizontal: paddingHorizontal }}
          // When true with empty data, it causes a crash on Android
          removeClippedSubviews={Platform.OS === 'android' && [0, 1].length > 0}
          // Helps hide blank spaces when scrolling too fast, decrease if it affects performance too much
          estimatedItemSize={screenWidth - 2 * paddingHorizontal}
          snapToAlignment={'start'}
          snapToInterval={screenWidth - 2 * paddingHorizontal}
          scrollsToTop={false}
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bouncesZoom={false}
          contentInsetAdjustmentBehavior={'never'}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      ) : (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingHorizontal: paddingHorizontal }}
          // Helps hide blank spaces when scrolling too fast, decrease if it affects performance too much
          getItemLayout={getItemLayout}
          snapToAlignment={'start'}
          snapToInterval={screenWidth - 2 * paddingHorizontal}
          scrollsToTop={false}
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bouncesZoom={false}
          contentInsetAdjustmentBehavior={'never'}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      )}
    </View>
  );
};

export default TopicsMapTable;

import React from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import { useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { ContentStyle, FlashList } from '@shopify/flash-list';
import { BasePressableScale } from 'components/base/base-pressable-scale/BasePressableScale';
import { BaseImage } from 'components/base/base-image/BaseImage';
import {
  TOPIC_CONTENT,
  TopicContentKeyType,
  changeOpacityOfRgbaColor,
  hexColorToRgba,
} from '@utils';
import { BaseText } from 'components/base/base-text/BaseText';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { CheckFilledSvg } from '@svgs';
import { colors } from '@theme';

type TopicsListProps = {
  onChangeTopics?: (topics: TopicContentKeyType[]) => void;
  style?: StyleProp<ViewStyle>;
  listStyle?: ContentStyle;
  initialTopics?: TopicContentKeyType[];
};

const DATA = TOPIC_CONTENT.map((topic) => ({
  key: topic.key,
  title: topic.title,
}));
const IMAGES = {
  'world-wonders': require('resources/assets/achievements-compressed/world-wonders.jpg'),
  'chernobyl-disaster': require('resources/assets/achievements-compressed/chernobyl-disaster.jpg'),
  'ancient-egypt': require('resources/assets/achievements-compressed/ancient-egypt.jpg'),
  'cold-war': require('resources/assets/achievements-compressed/cold-war.jpg'),
  'black-death': require('resources/assets/achievements-compressed/black-death.jpg'),
  'the-history-of-math': require('resources/assets/achievements-compressed/the-history-of-math.jpg'),
  'territorial-ownership-of-islands': require('resources/assets/achievements-compressed/territorial-ownership-of-islands.jpg'),
  'pearl-harbor': require('resources/assets/achievements-compressed/pearl-harbor.jpg'),
  'vietnam-war': require('resources/assets/achievements-compressed/vietnam-war.jpg'),
  pompeii: require('resources/assets/achievements-compressed/pompeii.jpg'),
  medici: require('resources/assets/achievements-compressed/medici.jpg'),
  'powerful-queens': require('resources/assets/achievements-compressed/powerful-queens.jpg'),
  vatican: require('resources/assets/achievements-compressed/vatican.jpg'),
  'america-discovery': require('resources/assets/achievements-compressed/america-discovery.jpg'),
  holocaust: require('resources/assets/achievements-compressed/holocaust.jpg'),
  'civil-war': require('resources/assets/achievements-compressed/civil-war.jpg'),
  'american-revolution': require('resources/assets/achievements-compressed/american-revolution.jpg'),
  'amelia-earhart': require('resources/assets/achievements-compressed/amelia-earhart.jpg'),
  pocahontas: require('resources/assets/achievements-compressed/pocahontas.jpg'),
  'mexican-american-war': require('resources/assets/achievements-compressed/mexican-american-war.jpg'),
  lincoln: require('resources/assets/achievements-compressed/lincoln.jpg'),
  'manhattan-project': require('resources/assets/achievements-compressed/manhattan-project.jpg'),
  jazz: require('resources/assets/achievements-compressed/jazz.jpg'),
  babylon: require('resources/assets/achievements-compressed/babylon.jpg'),
  railroad: require('resources/assets/achievements-compressed/railroad.jpg'),
  hollywood: require('resources/assets/achievements-compressed/hollywood.jpg'),
  'greatest-thinkers': require('resources/assets/achievements-compressed/greatest-thinkers.jpg'),
  'great-depression': require('resources/assets/achievements-compressed/great-depression.jpg'),
  buddhism: require('resources/assets/achievements-compressed/buddhism.jpg'),
  'cuban-crisis': require('resources/assets/achievements-compressed/cuban-crisis.jpg'),
  baseball: require('resources/assets/achievements-compressed/baseball.jpg'),
  normandy: require('resources/assets/achievements-compressed/normandy.jpg'),
  cia: require('resources/assets/achievements-compressed/cia.jpg'),
  mossad: require('resources/assets/achievements-compressed/mossad.jpg'),
  musk: require('resources/assets/achievements-compressed/musk.jpg'),
  obama: require('resources/assets/achievements-compressed/obama.jpg'),
  king: require('resources/assets/achievements-compressed/king.jpg'),
  trump: require('resources/assets/achievements-compressed/trump.jpg'),
  fathers: require('resources/assets/achievements-compressed/fathers.jpg'),
  boston: require('resources/assets/achievements-compressed/boston.jpg'),
  chicago: require('resources/assets/achievements-compressed/chicago.jpg'),
  'statue-of-liberty': require('resources/assets/achievements-compressed/statue-of-liberty.jpg'),
  slavery: require('resources/assets/achievements-compressed/slavery.jpg'),
  columbus: require('resources/assets/achievements-compressed/columbus.jpg'),
  conquistadors: require('resources/assets/achievements-compressed/conquistadors.jpg'),
  'republicans-democrats': require('resources/assets/achievements-compressed/republicans-democrats.jpg'),
  rushmore: require('resources/assets/achievements-compressed/rushmore.jpg'),
  basketball: require('resources/assets/achievements-compressed/basketball.jpg'),
  'election-system': require('resources/assets/achievements-compressed/election-system.jpg'),
  aztecs: require('resources/assets/achievements-compressed/aztecs.jpg'),
};

const TopicsList: React.FC<TopicsListProps> = ({
  onChangeTopics,
  style,
  listStyle,
  initialTopics,
}) => {
  const { styles, theme, screenWidth } = useBaseAspect(aspectStyle);

  const CARD_SIZE = (screenWidth - 24 - 24 - 16) / 2;

  const [topics, setTopics, topicsRef] = useBaseStateAndRef<
    TopicContentKeyType[]
  >(initialTopics ?? []);

  const onCardPress = (key: TopicContentKeyType) => {
    if (topicsRef.current.includes(key)) {
      setTopics(topicsRef.current.filter((item) => item !== key));
    } else {
      setTopics([...topicsRef.current, key]);
    }

    onChangeTopics?.([...topicsRef.current]);
  };

  const renderItem = React.useCallback(
    ({
      index,
      item,
    }: {
      index: number;
      item: { title: string; key: TopicContentKeyType };
    }) => {
      const onPress = () => {
        onCardPress(item.key);
      };
      return (
        <BasePressableScale
          style={[
            {
              left: index % 2 === 0 ? 24 : 6,
            },
            styles.itemContainer,
          ]}
          onPress={onPress}>
          <BaseImage
            source={
              IMAGES[item.key] ??
              require('resources/assets/achievements-compressed/cold-war.jpg')
            }
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <BaseText
              type={'texturina-20-semi-bold'}
              style={styles.title}
              numberOfLines={3}
              adjustsFontSizeToFit>
              {item.title}
            </BaseText>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.3, y: 1 }}
            locations={[0, 1]}
            colors={[
              changeOpacityOfRgbaColor(hexColorToRgba('#000000'), 0.7),
              changeOpacityOfRgbaColor(hexColorToRgba('#000000'), 0.0),
            ]}
            style={styles.gradient}
          />
          {topics.includes(item.key) ? (
            <Animated.View
              style={styles.fillContainer}
              key={`welcome-page-onboarding-pick-scene-item-${item.key}`}
              entering={FadeIn}
              exiting={FadeOut}>
              <LinearGradient
                start={{ x: 0, y: 0.7 }}
                end={{ x: 0.3, y: 1 }}
                locations={[0, 1]}
                colors={[
                  changeOpacityOfRgbaColor(
                    hexColorToRgba(colors[theme].text.primary),
                    0.05,
                  ),
                  changeOpacityOfRgbaColor(
                    hexColorToRgba(colors[theme].text.primary),
                    0.4,
                  ),
                ]}
                style={styles.gradient}
              />
              <View style={styles.checkContainer}>
                <CheckFilledSvg />
              </View>
            </Animated.View>
          ) : null}
        </BasePressableScale>
      );
    },
    [topics],
  );

  const keyExtractor = React.useCallback(
    (item: { key: string }, index: number) => {
      return `welcome-page-onboarding-pick-scene-${item.key}-${index}`;
    },
    [topics],
  );

  return (
    <View style={[styles.listContainer, style]}>
      <FlashList
        data={DATA}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={Platform.OS === 'android' && DATA.length > 0}
        estimatedItemSize={CARD_SIZE}
        contentContainerStyle={{ ...styles.listContent, ...listStyle }}
        extraData={topics}
      />
    </View>
  );
};

export default TopicsList;

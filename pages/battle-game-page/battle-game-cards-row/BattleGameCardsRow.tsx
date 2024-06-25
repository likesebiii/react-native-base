import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { TOPIC_CONTENT_ACHIEVEMENTS } from '@utils';
import TopicAchievementCard from 'pages/topic-page/components/topic-achievement-card/TopicAchievementCard';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import { Platform } from 'react-native';
import { useBattleGameCardsAnimations } from './hooks/useBattleGameCardsAnimations';
import {
  Gesture,
  GestureDetector,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

interface BattleGameCardsRowProps {
  index: number;
  cardHeight: number;
  animated: SharedValue<number>;
  cards?: number[];
  gray?: boolean;
  onAchievementPress?: (id: number) => void;
  disableScroll?: boolean;
}

const BattleGameCardsRow: React.FC<BattleGameCardsRowProps> = ({
  index,
  cardHeight,
  animated,
  cards,
  gray,
  onAchievementPress,
  disableScroll = true,
}) => {
  const {} = useBaseAspect(aspectStyle);

  const translateX = useSharedValue(0);
  const initialTranslateX = useSharedValue(0);

  const { animatedStyle } = useBattleGameCardsAnimations({
    animated,
    index,
    cardHeight,
  });

  const gesture = Gesture.Pan()
    .onStart(() => {
      if (disableScroll) {
        return;
      }

      initialTranslateX.value = translateX.value;
    })
    .onChange((event) => {
      if (disableScroll) {
        return;
      }

      translateX.value = Math.min(
        cardHeight * 0.71,
        Math.max(
          -cardHeight * 0.71,
          initialTranslateX.value + event.translationX,
        ),
      );
    })
    .onEnd((event) => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [-cardHeight * 0.71, cardHeight * 0.71],
      });
    });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  return (
    <Animated.View style={containerAnimatedStyle}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              top: -cardHeight * (Platform.OS === 'ios' ? 0.765 : 0.6),
              flexDirection: 'row',
              backfaceVisibility: 'hidden',
              position: 'absolute',
            },
            animatedStyle,
          ]}>
          <TouchableWithoutFeedback
            style={{ marginRight: 16 }}
            onPress={() => {
              onAchievementPress?.(cards?.[0] ?? 11);
            }}
            disabled={!onAchievementPress}>
            <TopicAchievementCard
              cardHeight={cardHeight}
              title={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[0] ?? 11].title}
              content={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[0] ?? 11].content}
              image={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[0] ?? 11].image}
              gray={gray}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={{ marginRight: 16 }}
            onPress={() => {
              onAchievementPress?.(cards?.[1] ?? 13);
            }}
            disabled={!onAchievementPress}>
            <TopicAchievementCard
              cardHeight={cardHeight}
              title={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[1] ?? 13].title}
              content={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[1] ?? 13].content}
              image={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[1] ?? 13].image}
              gray={gray}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              onAchievementPress?.(cards?.[2] ?? 17);
            }}
            disabled={!onAchievementPress}>
            <TopicAchievementCard
              cardHeight={cardHeight}
              title={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[2] ?? 17].title}
              content={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[2] ?? 17].content}
              image={TOPIC_CONTENT_ACHIEVEMENTS[cards?.[2] ?? 17].image}
              gray={gray}
            />
          </TouchableWithoutFeedback>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default BattleGameCardsRow;

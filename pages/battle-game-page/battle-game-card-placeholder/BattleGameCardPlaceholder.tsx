import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { colors } from '@theme';
import { TOPIC_CONTENT_ACHIEVEMENTS } from '@utils';
import TopicAchievementCard from 'pages/topic-page/components/topic-achievement-card/TopicAchievementCard';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface BattleGameCardPlaceholderProps {
  index?: number;
}

const BattleGameCardPlaceholder: React.FC<BattleGameCardPlaceholderProps> = ({
  index,
}) => {
  const {} = useBaseAspect(aspectStyle);

  return (
    <View
      style={{
        height: 120,
        width: 120 / 1.324,
        borderRadius: 5,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 5,
          backgroundColor: colors.light.text.primary,
          opacity: 0.15,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 6,
          left: 6,
          right: 6,
          bottom: 6,
          borderRadius: 3,
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: colors.light.main.inverted,
          opacity: 0.5,
        }}
      />
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        key={`battle-game-card-placeholder-${index}`}>
        {index ? (
          <TopicAchievementCard
            cardHeight={120}
            title={TOPIC_CONTENT_ACHIEVEMENTS[index].title}
            content={TOPIC_CONTENT_ACHIEVEMENTS[index].content}
            image={TOPIC_CONTENT_ACHIEVEMENTS[index].image}
          />
        ) : undefined}
      </Animated.View>
    </View>
  );
};

export default BattleGameCardPlaceholder;

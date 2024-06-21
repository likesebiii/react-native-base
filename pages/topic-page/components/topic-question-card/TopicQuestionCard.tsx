import React from 'react';
import { View, Text } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import TopicQuestionCardMargins from '../topic-question-card-margins/TopicQuestionCardMargins';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MAX_TEXT_SIZE_MULTIPLIER, TopicContentDifficultyType } from '@utils';
import TopicContentCard from '../topic-content-card/TopicContentCard';

type TopicQuestionCardProps = {
  title: string;
  contentHeight: number;
  cardBackType?: 'normal' | 'blue';
  backgroundColor?: string;
  topic?: string;
  difficulty?: TopicContentDifficultyType;
  retryState?: 'initial' | 'retried';
};

const DEFAULT_TIMEOUT = 1500;
const RETRY_CONTENT = `Oops, missed this question? 😞 Don't worry, you've got options:\n\n👆 Swipe to skip.\n👇 Drag to the question mark for insights.`;

const TopicQuestionCard: React.FC<TopicQuestionCardProps> = ({
  title,
  contentHeight,
  cardBackType,
  backgroundColor = '#C2A984',
  difficulty,
  topic,
  retryState,
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const spinToRetry = useSharedValue<number>(0);

  React.useEffect(() => {
    setTimeout(() => {
      spinToRetry.value = retryState == 'retried' ? 1 : 0;
    }, DEFAULT_TIMEOUT);
  }, [retryState]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spinToRetry.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spinToRetry.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  return (
    <View
      style={[
        styles.cardContent,
        {
          height: contentHeight + contentHeight * 0.06,
          width: contentHeight * 0.695 + contentHeight * 0.06,
          borderRadius: contentHeight * 0.04,
          padding: contentHeight * 0.08,
        },
      ]}>
      <Animated.View
        style={[
          styles.absolute,
          { backfaceVisibility: 'hidden' },
          backAnimatedStyle,
        ]}>
        {retryState ? (
          <TopicContentCard
            title={title}
            content={RETRY_CONTENT}
            topic={'retry'}
          />
        ) : undefined}
      </Animated.View>
      <Animated.View style={[styles.absolute, frontAnimatedStyle]}>
        <TopicQuestionCardMargins
          contentHeight={contentHeight}
          cardBackType={cardBackType}
          topic={topic}
          backgroundColor={backgroundColor}
          difficulty={difficulty}
        />
        <View style={styles.questionTitle}>
          <View
            style={[
              styles.titleContent,
              {
                height: contentHeight * 0.8,
                width: contentHeight * 0.695 - screenHeight * 0.04,
              },
              {
                borderRadius: contentHeight * 0.23,
                marginTop: contentHeight * 0.04,
                paddingHorizontal: contentHeight * 0.01,
              },
            ]}>
            <Text
              style={[
                {
                  fontSize: Math.min(28, Math.max(14, contentHeight * 0.05)),
                },
                styles.textTitle,
              ]}
              numberOfLines={6}
              adjustsFontSizeToFit
              minimumFontScale={interpolate(
                contentHeight,
                [0, 100, 400],
                [0, 0.4, 0.8],
              )}
              maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}>
              {title}
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default TopicQuestionCard;

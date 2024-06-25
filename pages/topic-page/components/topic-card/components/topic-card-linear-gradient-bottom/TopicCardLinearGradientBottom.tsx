import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import {
  hexColorToRgba,
  MAX_TEXT_SIZE_MULTIPLIER,
  TopicCardContentType,
  TopicContentDifficultyType,
} from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native';
import { useTopicCardLeftCards } from '../../hooks/useTopicCardLeftCards';
import { colors } from '@theme';

interface TopicCardLinearGradientBottomProps {
  cardHeight: number;
  element: TopicCardContentType & {
    difficulty?: TopicContentDifficultyType;
    topic?: string;
  } & {
    state?: 'correct' | 'wrong';
    unlocked?: boolean;
    cardsCount?: number;
    cardsCollected?: number;
  };
  fullContent: TopicCardContentType[];
}

const TopicCardLinearGradientBottom: React.FC<
  TopicCardLinearGradientBottomProps
> = ({ cardHeight, element, fullContent }) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const { leftQuestions } = useTopicCardLeftCards({
    fullContent,
  });

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.8 }}
      locations={[0, 1]}
      colors={[
        hexColorToRgba(colors[theme].text.primary),
        hexColorToRgba('#9FE0CC'),
      ]}
      style={[
        styles.cardContent,
        styles.align,
        {
          height: cardHeight * 1.06,
          borderRadius: cardHeight * 0.04,
        },
      ]}>
      <Text
        style={styles.learnMoreText}
        maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}>
        {element.id === -3
          ? leftQuestions === 0
            ? 'UPGRADE DECK'
            : 'RETRY DECK'
          : 'LEARN MORE'}
      </Text>
    </LinearGradient>
  );
};

export default TopicCardLinearGradientBottom;

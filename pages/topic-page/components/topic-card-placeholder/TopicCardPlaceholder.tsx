import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import TopicQuestionCardMargins from '../topic-question-card-margins/TopicQuestionCardMargins';
import { getCardHeight } from 'pages/topic-page/constants';

interface TopicCardPlaceholderProps {
  backgroundColor?: string;
  cardHeight?: number;
}

const TopicCardPlaceholder: React.FC<TopicCardPlaceholderProps> = ({
  backgroundColor = '#A89577',
  cardHeight,
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const contentHeight = cardHeight ?? getCardHeight(screenHeight);

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
        backgroundColor ? { backgroundColor } : {},
      ]}>
      <TopicQuestionCardMargins
        contentHeight={contentHeight}
        backgroundColor={backgroundColor}
        disableBack
      />
    </View>
  );
};

export default TopicCardPlaceholder;

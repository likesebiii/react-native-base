import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import TopicCardPlaceholder from '../topic-card-placeholder/TopicCardPlaceholder';
import { getCardHeight } from 'pages/topic-page/constants';

interface TopicCardPlaceholdersProps {
  cardHeight?: number;
  cardBackType?: 'normal' | 'blue';
}

const TopicCardPlaceholders: React.FC<TopicCardPlaceholdersProps> = ({
  cardHeight,
  cardBackType = 'normal',
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const contentHeight = cardHeight ?? getCardHeight(screenHeight);

  return (
    <>
      <View
        style={[
          styles.firstPlaceholder,
          {
            transform: [
              { rotate: `${contentHeight * 0.005}deg` },
              { translateX: contentHeight * 0.042 },
              { translateY: contentHeight * 0.05 },
              { scale: 0.9 },
            ],
          },
        ]}>
        <TopicCardPlaceholder
          backgroundColor={cardBackType === 'blue' ? '#84A8C2' : '#8D7C63'}
          cardHeight={cardHeight}
        />
      </View>
      <View
        style={[
          styles.secondPlaceholder,
          {
            transform: [
              { rotate: `-${contentHeight * 0.005}deg` },
              { translateY: contentHeight * 0.02 },
              { translateX: -contentHeight * 0.015 },
              { scale: 0.98 },
            ],
          },
        ]}>
        <TopicCardPlaceholder
          backgroundColor={cardBackType === 'blue' ? '#84A8C2' : undefined}
          cardHeight={cardHeight}
        />
      </View>
    </>
  );
};

export default TopicCardPlaceholders;

import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageCarouselComponentCard from '../welcome-page-carousel-component-card/WelcomePageCarouselComponentCard';

type WelcomePageCarouselLineComponentProps = {
  style?: StyleProp<ViewStyle>;
  initialCount?: number;
  cardBackType?: 'normal' | 'blue';
  backgroundColor?: string;
  order?: number;
};

const WelcomePageCarouselLineComponent: React.FC<
  WelcomePageCarouselLineComponentProps
> = ({ style, initialCount = 1, cardBackType, backgroundColor, order = 0 }) => {
  const { styles } = useBaseAspect(aspectStyle);
  const index = order * 6;

  return (
    <View style={[styles.container, style]}>
      <WelcomePageCarouselComponentCard
        count={initialCount}
        cardBackType={cardBackType}
        backgroundColor={backgroundColor}
        index={index + 1}
      />
      <WelcomePageCarouselComponentCard
        style={styles.component}
        count={initialCount + 1}
        cardBackType={cardBackType}
        backgroundColor={backgroundColor}
        index={index + 2}
      />
      <WelcomePageCarouselComponentCard
        style={styles.component}
        count={initialCount + 2}
        cardBackType={cardBackType}
        backgroundColor={backgroundColor}
        index={index + 3}
      />
      <WelcomePageCarouselComponentCard
        style={styles.component}
        count={initialCount + 3}
        cardBackType={cardBackType}
        backgroundColor={backgroundColor}
        index={index + 4}
      />
      <WelcomePageCarouselComponentCard
        style={styles.component}
        count={initialCount + 4}
        cardBackType={cardBackType}
        backgroundColor={backgroundColor}
        index={index + 5}
      />
      <WelcomePageCarouselComponentCard
        style={styles.component}
        count={initialCount + 5}
        cardBackType={cardBackType}
        backgroundColor={backgroundColor}
        index={index + 6}
      />
    </View>
  );
};

export default WelcomePageCarouselLineComponent;

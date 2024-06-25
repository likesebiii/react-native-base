import React from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { sizing } from '@theme';
import {
  BASE_BOTTOM_PADDING,
  BASE_TOP_PADDING,
  TOPIC_CONTENT_QUESTIONS,
} from '@utils';
import TopicQuestionCard from 'pages/topic-page/components/topic-question-card/TopicQuestionCard';
import Animated, { FadeIn } from 'react-native-reanimated';

type WelcomePageCarouselComponentCardProps = {
  style?: StyleProp<ViewStyle>;
  count?: number;
  cardBackType?: 'normal' | 'blue';
  backgroundColor?: string;
  index?: number;
};

const WelcomePageCarouselComponentCard: React.FC<
  WelcomePageCarouselComponentCardProps
> = ({ style, count, cardBackType, index = 0, backgroundColor }) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const [display, setDisplay] = React.useState(false);

  const CONTENT_HEIGHT =
    screenHeight -
    86 -
    BASE_BOTTOM_PADDING -
    2 * sizing.m -
    BASE_TOP_PADDING +
    sizing.xl -
    48 -
    24 -
    28 -
    48 -
    (Platform.OS === 'android' ? 16 : 0);
  const CARD_HEIGHT = CONTENT_HEIGHT * 0.2;

  React.useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, index * 150);
  }, []);

  return (
    <View style={[styles.container, style]}>
      {display ? (
        <Animated.View
          entering={FadeIn}
          key={`welcome-page-carousel-component-${index}-${count}`}>
          <TopicQuestionCard
            title={
              (TOPIC_CONTENT_QUESTIONS[(count ?? 1) as never] as any)?.title
            }
            contentHeight={CARD_HEIGHT}
            cardBackType={cardBackType}
            backgroundColor={backgroundColor}
            topic={'history'}
          />
        </Animated.View>
      ) : undefined}
    </View>
  );
};

export default WelcomePageCarouselComponentCard;

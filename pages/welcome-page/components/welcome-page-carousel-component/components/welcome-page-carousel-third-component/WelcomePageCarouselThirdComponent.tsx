import React from 'react';
import { Platform, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import {
  BASE_BOTTOM_PADDING,
  BASE_TOP_PADDING,
  TOPIC_CONTENT_ACHIEVEMENTS,
} from '@utils';
import { sizing } from '@theme';
import { interpolate } from 'react-native-reanimated';
import { BaseImage } from 'components/base/base-image/BaseImage';
import { VsSvg } from '@svgs';
import TopicAchievementCard from 'pages/topic-page/components/topic-achievement-card/TopicAchievementCard';

type WelcomePageCarouselThirdComponentProps = {};

const ADE_PHOTO = require('resources/assets/ade.png');
const HORTO_PHOTO = require('resources/assets/horto.png');

const WelcomePageCarouselThirdComponent: React.FC<
  WelcomePageCarouselThirdComponentProps
> = ({}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

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
    (Platform.OS === 'android' ? 16 : 0);
  const CARD_HEIGHT =
    CONTENT_HEIGHT * interpolate(screenHeight, [667, 852], [0.35, 0.4]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <View style={styles.firstImage}>
            <BaseImage
              source={ADE_PHOTO}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.firstCard}>
          <TopicAchievementCard
            cardHeight={CARD_HEIGHT}
            title={TOPIC_CONTENT_ACHIEVEMENTS[11].title}
            content={TOPIC_CONTENT_ACHIEVEMENTS[11].content}
            image={TOPIC_CONTENT_ACHIEVEMENTS[11].image}
          />
        </View>
      </View>
      <View style={styles.vsContainer}>
        <VsSvg height={interpolate(screenHeight, [667, 852], [50, 64])} />
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.firstContainer}>
          <View style={styles.secondImage}>
            <BaseImage
              source={HORTO_PHOTO}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.secondCard}>
          <TopicAchievementCard
            cardHeight={CARD_HEIGHT}
            title={TOPIC_CONTENT_ACHIEVEMENTS[8].title}
            content={TOPIC_CONTENT_ACHIEVEMENTS[8].content}
            image={TOPIC_CONTENT_ACHIEVEMENTS[8].image}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <BaseText
          type={'texturina-34-regular'}
          style={styles.text}
          numberOfLines={2}
          adjustsFontSizeToFit>
          {'Test your knowledge against others'}
        </BaseText>
      </View>
    </>
  );
};

export default WelcomePageCarouselThirdComponent;

import React from 'react';
import { Platform, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { sizing } from '@theme';
import { BASE_BOTTOM_PADDING, BASE_TOP_PADDING } from '@utils';
import { BaseText } from 'components/base/base-text/BaseText';
import { BaseImage } from 'components/base/base-image/BaseImage';

type WelcomePageCarouselFirstComponentProps = {};

const WELCOME_FIRST_CAROUSEL = require('resources/assets/welcome-intro-1.png');

const WelcomePageCarouselFirstComponent: React.FC<
  WelcomePageCarouselFirstComponentProps
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
  const CARD_HEIGHT = CONTENT_HEIGHT * 0.75;

  return (
    <>
      <View
        style={{
          height: CARD_HEIGHT,
          width: '100%',
          alignItems: 'center',
        }}>
        <BaseImage
          source={WELCOME_FIRST_CAROUSEL}
          style={{ width: CARD_HEIGHT, height: CARD_HEIGHT }}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.textContainer}>
        <BaseText
          type={'texturina-34-regular'}
          style={styles.text}
          numberOfLines={2}
          adjustsFontSizeToFit>
          {'Learn History\nin 5 minutes a day'}
        </BaseText>
      </View>
    </>
  );
};

export default WelcomePageCarouselFirstComponent;

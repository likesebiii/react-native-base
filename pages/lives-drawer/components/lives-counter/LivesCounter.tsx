import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { LIVES_LIMIT } from '@utils';
import { useSelectVortex } from '@services';
import BaseAnimatedDate from 'components/base/base-animated-date/BaseAnimatedDate';

type LivesCounterProps = {
  date: string;
  lives: number;
  style?: StyleProp<ViewStyle>;
};

const LivesCounter: React.FC<LivesCounterProps> = ({ lives, style, date }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const isPro = useSelectVortex('user-vortex', 'selectUserSubscriptionType');
  const fullLives = lives >= LIVES_LIMIT[isPro];

  return (
    <View style={[styles.container, style]}>
      {fullLives ? undefined : (
        <View style={styles.counter}>
          <BaseAnimatedDate date={date} />
        </View>
      )}
      <BaseText type={'texturina-20-regular'} style={styles.bottomText}>
        {fullLives
          ? 'You have maximum lives\nright now!'
          : 'Time left until you get +1 life'}
      </BaseText>
    </View>
  );
};

export default LivesCounter;

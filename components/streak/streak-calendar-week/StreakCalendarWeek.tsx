import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { colors } from '@theme';
import StreakCalendarCell from '../streak-calendar-cell/StreakCalendarCell';

type StreakCalendarWeekProps = {};

const DAYS_ARRAY = Array.from({ length: 7 }, (_, i) => i);

const StreakCalendarWeek: React.FC<StreakCalendarWeekProps> = ({}) => {
  const { styles, theme, screenWidth } = useBaseAspect(aspectStyle);

  const date = React.useMemo(() => new Date(), []);

  const dateArray = React.useMemo(() => {
    return DAYS_ARRAY.map((day) => {
      return new Date(new Date().setDate(date.getDate() + day));
    });
  }, []);

  const margin = React.useMemo(() => {
    return ((screenWidth - 48) / 7 - 24) / 2;
  }, []);

  return (
    <View style={styles.container}>
      {dateArray.map((date, index) => {
        const isLower = date.getDate() < 10;

        return (
          <View key={index} style={{ marginHorizontal: margin }}>
            <BaseText
              type={'texturina-24-semi-bold'}
              style={[
                { color: colors[theme].text.secondary },
                isLower ? styles.margin : undefined,
              ]}>
              {date.getDate()}
            </BaseText>
            <StreakCalendarCell
              type={index === 0 ? 'filled' : 'empty'}
              width={2 * margin}
            />
          </View>
        );
      })}
    </View>
  );
};

export default StreakCalendarWeek;

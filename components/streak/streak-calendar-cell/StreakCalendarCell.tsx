import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { StreakSvg } from '@svgs';
import { interpolate } from 'react-native-reanimated';

type StreakCalendarCellProps = {
  type?: 'empty' | 'filled';
  width?: number;
};

const getFilledStyle = (width: number) => {
  return {
    left: -interpolate(width, [28, 56], [4, 24]),
    top: 0.12 * width,
    height: 1.25 * width,
    width: 1.25 * width,
    borderRadius: width * 0.62,
  };
};

const getEmptyStyle = (width: number) => {
  return {
    left: -interpolate(width, [28, 56], [0, 8]),
    top: 0.25 * width,
    height: width,
    width: width,
    borderRadius: width * 0.5,
  };
};

const StreakCalendarCell: React.FC<StreakCalendarCellProps> = ({
  type = 'empty',
  width = 28,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const filledStyle = React.useMemo(() => getFilledStyle(width), [width]);
  const emptyStyle = React.useMemo(() => getEmptyStyle(width), [width]);

  return (
    <View>
      {type === 'filled' ? (
        <View style={[styles.filled, filledStyle]}>
          <StreakSvg width={24} height={24} fill={'#FFF8BA'} />
        </View>
      ) : (
        <View style={[styles.empty, emptyStyle]} />
      )}
    </View>
  );
};

export default StreakCalendarCell;

import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Rect } from 'react-native-svg';

export const CardMarginSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={502} height={723} viewBox="0 0 502 723" fill="none" {...props}>
      <Rect
        width={497}
        height={718}
        x={2.256}
        y={2.561}
        stroke={props.fill ?? '#D1BB9A'}
        strokeWidth={4.686}
        rx={7.373}
        fill={'transparent'}
      />
    </Svg>
  );
});

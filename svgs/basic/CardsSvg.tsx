import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Rect } from 'react-native-svg';

export const CardsSvg = React.memo<
  SvgProps & { fillFirst?: string; fillSecond?: string }
>((props) => {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
      <Rect
        width={22}
        height={26}
        x={12.729}
        y={2}
        fill={props.fillFirst ?? '#3EA78E'}
        rx={3.109}
        transform="rotate(15 12.729 2)"
      />
      <Rect
        width={22}
        height={26}
        x={2}
        y={8}
        fill={props.fillSecond ?? '#48C29E'}
        rx={3.109}
      />
    </Svg>
  );
});

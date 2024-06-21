import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BellSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={35} height={35} viewBox="0 0 35 35" fill="none" {...props}>
      <Path
        fill={props.fill ?? '#fff'}
        d="M17.5 31.5A3.51 3.51 0 0 0 21 28h-7a3.51 3.51 0 0 0 3.5 3.5Zm7-14.35v-4.025c0-3.15-2.1-5.95-5.25-6.825.176-.35.176-.7.35-.875-.174-1.05-1.05-1.925-2.1-1.925s-1.924.875-1.924 1.925c0 .35.175.7.35.875-3.15.7-5.25 3.5-5.25 6.825v3.85c-.175 2.1-1.575 4.025-3.5 4.9v4.375h21v-4.375c-2.1-.7-3.5-2.625-3.675-4.725Z"
      />
    </Svg>
  );
});

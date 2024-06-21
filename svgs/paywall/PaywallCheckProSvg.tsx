import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const PaywallCheckProSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg viewBox="0 0 55 55" width={55} height={55} fill="none" {...props}>
      <Circle cx={27.5} cy={27.5} r={27.5} fill="#005F73" />
      <Path
        fill="#F8F8F8"
        d="M24.364 34.47 18 28.106l2.121-2.121 4.244 4.242 8.484-8.486 2.122 2.123L24.365 34.47Z"
      />
      <Path
        fill="#F8F8F8"
        fillRule="evenodd"
        d="M10.5 28c0-9.113 7.387-16.5 16.5-16.5 9.112 0 16.5 7.387 16.5 16.5 0 9.112-7.388 16.5-16.5 16.5-9.113 0-16.5-7.388-16.5-16.5ZM27 41.5a13.5 13.5 0 1 1 0-27.002A13.5 13.5 0 0 1 27 41.5Z"
        clipRule="evenodd"
      />
    </Svg>
  );
});

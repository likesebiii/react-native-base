import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const PaywallLockProSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg viewBox="0 0 55 55" width={55} height={55} fill="none" {...props}>
      <Circle cx={27.5} cy={27.5} r={27.5} fill="#005F73" />
      <Path
        fill="#fff"
        d="M31.6 26.2v-5.4c0-1.98-1.62-3.6-3.6-3.6a3.61 3.61 0 0 0-3.6 3.6h-3.6c0-3.978 3.221-7.2 7.2-7.2 3.977 0 7.2 3.222 7.2 7.2v5.4H37c.99 0 1.8.81 1.8 1.8v12.6c0 .99-.81 1.8-1.8 1.8H19c-.99 0-1.8-.81-1.8-1.8V28c0-.99.81-1.8 1.8-1.8h12.6Zm-1.8 12.6-.649-3.87A2.675 2.675 0 0 0 30.7 32.5c0-1.494-1.206-2.7-2.7-2.7a2.696 2.696 0 0 0-2.7 2.7c0 1.08.63 1.998 1.548 2.43L26.2 38.8h3.6Z"
      />
    </Svg>
  );
});

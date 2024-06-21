import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const PresentSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" {...props}>
      <Path
        fill="#005F73"
        d="M47 32v12a3 3 0 0 1-3 3H20a3 3 0 0 1-3-3V32a1.5 1.5 0 0 1-1.5-1.5V26a3 3 0 0 1 3-3h4.755a4.5 4.5 0 0 1 4.245-6c1.5 0 2.82.75 3.645 1.86v-.015L32 20l.855-1.155v.015C33.68 17.75 35 17 36.5 17a4.5 4.5 0 0 1 4.245 6H45.5a3 3 0 0 1 3 3v4.5A1.5 1.5 0 0 1 47 32ZM20 44h10.5V32H20v12Zm24 0V32H33.5v12H44ZM27.5 20a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-18 6v3h12v-3h-12Zm15 0v3h12v-3h-12Z"
      />
    </Svg>
  );
});

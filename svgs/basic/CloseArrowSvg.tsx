import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from '@utils';

export const CloseArrowSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke="#005F73"
        strokeLinecap="round"
        strokeWidth={4}
        d="m15 4-8.23 7.773a1 1 0 0 0 0 1.454L15 21"
      />
    </Svg>
  );
});

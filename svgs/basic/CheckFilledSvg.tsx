import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CheckFilledSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        fill="#F8F8F8"
        d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28Zm-1.646 19.236a.5.5 0 0 1-.707 0l-3.852-3.851a1.124 1.124 0 1 1 1.59-1.59l2.438 2.438a.25.25 0 0 0 .354 0l6.44-6.44a1.125 1.125 0 1 1 1.59 1.591l-7.853 7.852Z"
      />
    </Svg>
  );
});

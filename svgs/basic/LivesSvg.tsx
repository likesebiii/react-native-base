import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LivesSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
      <Path
        fill="#D74141"
        d="M5 8.894V20.88c0 3.281 1.71 6.325 4.512 8.032l7.266 4.426a2.09 2.09 0 0 0 2.175 0l7.266-4.426a9.404 9.404 0 0 0 4.512-8.032V8.894a3.135 3.135 0 0 0-2.059-2.944l-10.09-3.688a2.09 2.09 0 0 0-1.434 0L7.058 5.95A3.135 3.135 0 0 0 5 8.894Z"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2.809}
        d="M13.033 18h9.6M17.834 22.8v-9.6"
      />
    </Svg>
  );
});

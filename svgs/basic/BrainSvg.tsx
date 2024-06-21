import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BrainSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" {...props}>
      <Path
        fill="#005F73"
        d="M24.5 8c-2.803 0-5.128 1.922-5.794 4.519-.075 0-.131-.019-.206-.019-3.31 0-6 2.69-6 6 0 .45.056.89.16 1.313A7.5 7.5 0 0 0 8 26.75c0 1.181.3 2.278.778 3.272C6.528 31.316 5 33.716 5 36.5a7.5 7.5 0 0 0 4.631 6.928A6.746 6.746 0 0 0 16.25 51.5c.384 0 .76-.047 1.125-.112.9 2.671 3.394 4.612 6.375 4.612a6.746 6.746 0 0 0 6.75-6.75V14c0-3.31-2.69-6-6-6ZM59 36.5c0-2.784-1.528-5.184-3.778-6.478.487-.994.778-2.09.778-3.272a7.5 7.5 0 0 0-4.66-6.938c.094-.421.16-.862.16-1.312 0-3.31-2.69-6-6-6-.075 0-.14.019-.206.019C44.628 9.922 42.304 8 39.5 8a6 6 0 0 0-6 6v35.25A6.746 6.746 0 0 0 40.25 56c2.981 0 5.475-1.94 6.375-4.612.366.065.74.112 1.125.112a6.746 6.746 0 0 0 6.619-8.072A7.5 7.5 0 0 0 59 36.5Z"
      />
    </Svg>
  );
});

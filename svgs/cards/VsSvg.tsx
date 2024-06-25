import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const VsSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={76} height={65} viewBox={'0 0 76 66'} fill="none" {...props}>
      <Path
        fill="#005F73"
        stroke="#D9E7D7"
        strokeWidth={7}
        d="m36.077 58.695 6.785-33.45c.375.797.793 1.604 1.246 2.418L54.41 46.148H41.505V61.5h23.685l.905-.635c4.372-3.067 6.314-7.834 6.314-13.521 0-3.18-1.594-7.081-3.964-11.34L59.534 19.74h11.868V4.1H49.909l-.657.279c-.859.365-1.667.793-2.418 1.286l.318-1.565H29.547l-.495 2.914-3.173 18.694-3.174-18.694-.494-2.914H4.605l.852 4.195 10.224 50.4.568 2.805h19.259l.569-2.805Z"
      />
    </Svg>
  );
});

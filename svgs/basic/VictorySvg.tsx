import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const VictorySvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Circle
        cx={16.001}
        cy={16.001}
        r={12.333}
        fill="#FFB600"
        stroke="#F3AD00"
        strokeWidth={2}
      />
      <Path
        fill="#FFCC4D"
        d="M14.606 9.494c.571-1.156 2.22-1.156 2.79 0l.986 1.998c.227.46.665.778 1.172.851l2.205.32c1.276.186 1.785 1.754.862 2.654l-1.596 1.555a1.556 1.556 0 0 0-.447 1.377l.377 2.197c.217 1.27-1.116 2.24-2.257 1.64l-1.973-1.037a1.556 1.556 0 0 0-1.448 0l-1.972 1.036c-1.141.6-2.475-.369-2.257-1.64l.377-2.196a1.556 1.556 0 0 0-.448-1.377l-1.595-1.555c-.923-.9-.414-2.468.862-2.653l2.205-.32a1.555 1.555 0 0 0 1.171-.851l.986-1.999Z"
      />
    </Svg>
  );
});

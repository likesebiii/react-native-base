import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { SvgProps } from '@utils';

export const CloseSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill="#005F73"
          fillRule="evenodd"
          d="m16 18.83 7.07 7.07a2 2 0 0 0 2.83-2.83L18.827 16l7.072-7.07a1.999 1.999 0 1 0-2.83-2.829L16 13.172l-7.07-7.07A2 2 0 1 0 6.1 8.927L13.174 16 6.1 23.072a2 2 0 1 0 2.83 2.827l7.07-7.07Z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h32v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
});

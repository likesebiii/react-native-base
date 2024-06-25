import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path } from 'react-native-svg';

export const GoogleSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
      <G clipPath="url(#a)">
        <Circle cx={12} cy={12} r={12} fill="#fff" />
        <Path
          fill="#FBC02D"
          d="M19.844 10.433H19.2V10.4H12v3.2h4.521A4.798 4.798 0 0 1 7.2 12 4.8 4.8 0 0 1 12 7.2c1.224 0 2.337.462 3.184 1.216l2.263-2.263A7.963 7.963 0 0 0 12 4a8 8 0 1 0 7.844 6.433Z"
        />
        <Path
          fill="#E53935"
          d="m4.922 8.276 2.628 1.928A4.798 4.798 0 0 1 12 7.2c1.223 0 2.336.462 3.184 1.216l2.263-2.263A7.963 7.963 0 0 0 12 4a7.995 7.995 0 0 0-7.078 4.276Z"
        />
        <Path
          fill="#4CAF50"
          d="M12 20c2.067 0 3.945-.79 5.364-2.077l-2.476-2.095a4.764 4.764 0 0 1-2.887.972 4.798 4.798 0 0 1-4.513-3.178l-2.61 2.01A7.994 7.994 0 0 0 12.002 20Z"
        />
        <Path
          fill="#1565C0"
          d="m19.844 10.433-.006-.033H12v3.2h4.521a4.816 4.816 0 0 1-1.635 2.228h.002l2.476 2.095C17.188 18.082 20 16 20 12c0-.537-.055-1.06-.156-1.567Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
});

import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const PaywallStarProSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg viewBox="0 0 55 55" width={55} height={55} fill="none" {...props}>
      <Circle cx={27.5} cy={27.5} r={27.5} fill={props.fill ?? '#005F73'} />
      <Path
        fill="#fff"
        d="m27.5 11.75 5.25 10.5 10.5 1.313-7.21 8.085L38 43.25 27.5 38 17 43.25l1.977-11.602-7.227-8.085 10.5-1.313 5.25-10.5Z"
      />
    </Svg>
  );
});

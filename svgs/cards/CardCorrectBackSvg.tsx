import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CardCorrectBackSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={366} height={338} viewBox="0 0 366 338" fill="none" {...props}>
      <Path
        fill="#5CB096"
        d="M0 0h367v338s-34-59.717-183.5-59.717S0 338 0 338V0Z"
      />
    </Svg>
  );
});

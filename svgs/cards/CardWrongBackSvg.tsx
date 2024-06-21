import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CardWrongBackSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={395} height={299} viewBox="0 0 395 299" fill="none" {...props}>
      <Path
        fill="#D74141"
        d="M0 299V0h395v299l-69.588-49.419-24.531 31.947-52.567-18.469-53.567 22.961-32.041-51.913-42.554 38.935-64.582-23.461L0 299Z"
      />
    </Svg>
  );
});

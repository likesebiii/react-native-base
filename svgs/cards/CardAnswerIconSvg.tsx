import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CardAnswerSvgIcon = React.memo<SvgProps>((props) => {
  return (
    <Svg width={22} height={23} viewBox="0 0 22 23" fill="none" {...props}>
      <Path
        stroke="#C2A984"
        strokeLinecap="round"
        strokeWidth={3}
        d="M15.87 4.448H5.82a3 3 0 0 0-2.97 3.418l1.52 10.799"
      />
      <Path
        stroke="#C2A984"
        strokeLinecap="round"
        strokeWidth={3}
        d="M19.37 10.19h-8.816a1 1 0 0 0-.984 1.18l1.8 9.795"
      />
    </Svg>
  );
});

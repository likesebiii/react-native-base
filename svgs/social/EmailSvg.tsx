import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const EmailSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
      <Path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M12 13.812 9.513 11.75.836 20.633h22.107l-8.517-8.898L12 13.812Zm3.668-3.02 8.251 8.58A1.9 1.9 0 0 0 24 18.85V4.02l-8.332 6.772ZM0 3.988v14.864c0 .182.034.354.081.52l8.28-8.55L0 3.986Zm23.25-1.362H.75L12 11.639l11.25-9.014Z"
        clipRule="evenodd"
      />
    </Svg>
  );
});

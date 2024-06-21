import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const GrowSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" {...props}>
      <Path
        fill="#005F73"
        d="M51.846 21.234a2 2 0 0 0-1.08-1.08 2.002 2.002 0 0 0-.76-.16h-10a2 2 0 0 0 0 4h5.18l-11.18 11.18-6.58-6.6a2 2 0 0 0-2.84 0l-12 12a2.001 2.001 0 0 0 0 2.84 2 2 0 0 0 2.84 0l10.58-10.6 6.58 6.6a2 2 0 0 0 2.84 0l12.58-12.6v5.18a2 2 0 1 0 4 0v-10a1.999 1.999 0 0 0-.16-.76Z"
      />
    </Svg>
  );
});

import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CalendarSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" {...props}>
      <Path
        fill="#005F73"
        d="M40 12a2 2 0 0 1 1.986 1.766L42 14v2h2a6 6 0 0 1 5.99 5.648L50 22v24a6 6 0 0 1-5.648 5.99L44 52H20a6 6 0 0 1-5.99-5.648L14 46V22a6 6 0 0 1 5.648-5.99L20 16h2v-2a2 2 0 0 1 3.986-.234L26 14v2h12v-2a2 2 0 0 1 2-2Zm6 14H18v19.25c0 1.41.772 2.572 1.766 2.732L20 48h24c1.026 0 1.872-1.06 1.986-2.43l.014-.32V26Z"
      />
      <Path
        fill="#005F73"
        d="M32 32a2 2 0 0 1 1.986 1.766L34 34v6a2 2 0 0 1-3.986.234L30 40v-4a2 2 0 0 1-.234-3.986L30 32h2Z"
      />
    </Svg>
  );
});

import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LivesEmptySvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={129} height={161} viewBox="0 0 129 161" fill="none" {...props}>
      <Path
        fill="#D74141"
        d="M0 34.97V94.9a47.02 47.02 0 0 0 22.56 40.157l36.33 22.131a10.45 10.45 0 0 0 10.872 0l36.332-22.131a47.02 47.02 0 0 0 22.559-40.157V34.97a15.673 15.673 0 0 0-10.293-14.72L67.913 1.81a10.449 10.449 0 0 0-7.173 0L10.293 20.248A15.674 15.674 0 0 0 0 34.97Z"
      />
      <Path
        stroke="#fff"
        strokeWidth={5}
        d="M86.5 8.5 79 30l11.5 19L79 66.5l-5 14H55L50 102l-17.5 8 4.5 19.5-6.5 10.5"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={14.045}
        d="M40.166 80.5h48M64.17 104.5v-48"
      />
      <Path stroke="#fff" strokeWidth={4} d="m28.5 13.5 4 12.5L29 38l6.5 14" />
    </Svg>
  );
});

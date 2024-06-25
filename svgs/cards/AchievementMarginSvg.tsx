import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const AchievementMarginSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={343} height={490} viewBox="0 0 343 490" fill="none" {...props}>
      <Path
        fill={props.fill ?? '#fff'}
        d="m3.897 347 3.897 24H0l3.897-24ZM3.897 395l3.897-24H0l3.897 24ZM147 485.896l24-3.897v7.794l-24-3.897ZM195 485.896l-24-3.897v7.794l24-3.897ZM338.897 347l3.897 24H335l3.897-24ZM338.897 395l3.897-24H335l3.897 24Z"
      />
      <Path
        fill={props.fill ?? '#fff'}
        fillRule="evenodd"
        d="M9.998.031a7.967 7.967 0 0 0-7.967 7.967v332.955L4 329l1.966 11.934V7.998a4.033 4.033 0 0 1 4.032-4.032h323a4.032 4.032 0 0 1 4.033 4.032v332.955L339 329l1.966 11.934V7.998c0-4.4-3.567-7.967-7.968-7.967h-323Zm330.968 402.035L339 414l-1.969-11.953v77.951a4.032 4.032 0 0 1-4.033 4.033H202.047L214 486l-11.934 1.966h130.932a7.967 7.967 0 0 0 7.968-7.968v-77.932ZM9.998 484.031h130.955L129 486l11.934 1.966H9.998a7.967 7.967 0 0 1-7.967-7.968v-77.951L4 414l1.966-11.934v77.932a4.032 4.032 0 0 0 4.032 4.033Z"
        clipRule="evenodd"
      />
    </Svg>
  );
});

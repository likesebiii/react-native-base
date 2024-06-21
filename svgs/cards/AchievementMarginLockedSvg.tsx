import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export const AchievementMarginLockedSvg = React.memo<
  SvgProps & { progress?: number }
>((props) => {
  const progress = (props.progress ?? 1) * 0.9 + 0.35;
  const leftOffset = 0.5 - progress * 0.4;
  const rightOffset = 0.5 + progress * 0.4;

  return (
    <Svg width={343} height={490} viewBox="0 0 343 490" fill="none" {...props}>
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M8 .031A7.967 7.967 0 0 0 .033 7.998v332.955L2.002 329l1.966 11.934V7.998A4.033 4.033 0 0 1 8 3.966h323a4.032 4.032 0 0 1 4.033 4.032v332.955L337.002 329l1.966 11.934V7.998c0-4.4-3.567-7.967-7.968-7.967H8Zm330.968 402.035L337.002 414l-1.969-11.953v77.951a4.032 4.032 0 0 1-4.033 4.033H183.982c.954 1.106.955 2.827.003 3.935H331a7.967 7.967 0 0 0 7.968-7.968v-77.932ZM8 484.031h146.022c-.954 1.106-.955 2.827-.003 3.935H8a7.967 7.967 0 0 1-7.967-7.968v-77.951L2.002 414l1.966-11.934v77.932A4.032 4.032 0 0 0 8 484.031Z"
        clipRule="evenodd"
      />
      <Path
        fill={props.fill ?? '#fff'}
        d="M166.299 481.977h5.277v-1.943c0-.715-.257-1.326-.773-1.832a2.565 2.565 0 0 0-1.866-.759c-.728 0-1.35.253-1.865.759a2.472 2.472 0 0 0-.773 1.832v1.943Zm8.576.972v5.829c0 .27-.096.5-.289.689a.962.962 0 0 1-.701.283h-9.895a.962.962 0 0 1-.701-.283.928.928 0 0 1-.289-.689v-5.829c0-.27.096-.499.289-.688a.963.963 0 0 1 .701-.284h.329v-1.943c0-1.241.454-2.307 1.361-3.198s1.993-1.336 3.257-1.336c1.265 0 2.351.445 3.258 1.336s1.361 1.957 1.361 3.198v1.943h.329c.275 0 .509.095.701.284a.926.926 0 0 1 .289.688Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={0.002}
          x2={339.002}
          y1={244}
          y2={244}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={props.fill ?? '#fff'} stopOpacity={0} />
          <Stop
            offset={leftOffset}
            stopColor={props.fill ?? '#fff'}
            stopOpacity={0}
          />
          <Stop
            offset={Math.min(leftOffset + 0.15, 0.49)}
            stopColor={props.fill ?? '#fff'}
          />
          <Stop
            offset={Math.max(rightOffset - 0.15, 0.51)}
            stopColor={props.fill ?? '#fff'}
          />
          <Stop
            offset={rightOffset}
            stopColor={props.fill ?? '#fff'}
            stopOpacity={0}
          />
          <Stop offset={1} stopColor={props.fill ?? '#fff'} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
});

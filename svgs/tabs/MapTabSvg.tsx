import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { SvgProps } from '@utils';

export const MapTabSvgInactive = React.memo<SvgProps>((props) => {
  return (
    <Svg width={36} height={33} fill="none" viewBox="0 0 36 33" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill="#5193A3"
          fillRule="evenodd"
          d="M6.25.11H4.129a4 4 0 0 0-4 4v23.835a4 4 0 0 0 4 4h19.14a4 4 0 0 0 4-4V4.11a4 4 0 0 0-4-4H21.25V9a1.5 1.5 0 1 1-3 0V.11h-3V4.5a1.5 1.5 0 1 1-3 0V.11h-3V9a1.5 1.5 0 1 1-3 0V.11Zm8.842 9.72a1.5 1.5 0 0 0-2.684 0L10.5 13.645l-3.747.624a1.5 1.5 0 0 0-.814 2.54l2.47 2.47-.644 4.508a1.5 1.5 0 0 0 2.156 1.554l3.829-1.915 3.83 1.915a1.5 1.5 0 0 0 2.155-1.554l-.644-4.508 2.47-2.47a1.5 1.5 0 0 0-.814-2.54L17 13.646l-1.908-3.817Z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h28v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
});

export const MapTabSvgActive = React.memo<SvgProps>((props) => {
  return (
    <Svg width={36} height={33} viewBox="0 0 36 33" fill="none" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill="#005F73"
          fillRule="evenodd"
          d="M6.25.11H4.129a4 4 0 0 0-4 4v23.835a4 4 0 0 0 4 4h19.14a4 4 0 0 0 4-4V4.11a4 4 0 0 0-4-4H21.25V9a1.5 1.5 0 1 1-3 0V.11h-3V4.5a1.5 1.5 0 1 1-3 0V.11h-3V9a1.5 1.5 0 1 1-3 0V.11Zm8.842 9.72a1.5 1.5 0 0 0-2.684 0L10.5 13.645l-3.747.624a1.5 1.5 0 0 0-.814 2.54l2.47 2.47-.644 4.508a1.5 1.5 0 0 0 2.156 1.554l3.829-1.915 3.83 1.915a1.5 1.5 0 0 0 2.155-1.554l-.644-4.508 2.47-2.47a1.5 1.5 0 0 0-.814-2.54L17 13.646l-1.908-3.817Z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h28v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
});

type MapTabSvgProps = {
  active?: boolean;
};

export const MapTabSvg = React.memo<SvgProps & MapTabSvgProps>((props) => {
  const { active = false } = props;

  return active ? (
    <MapTabSvgActive {...props} />
  ) : (
    <MapTabSvgInactive {...props} />
  );
});

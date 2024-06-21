import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const UpgradeSvg = React.memo<
  SvgProps & { fillFirst?: string; fillSecond?: string }
>((props) => {
  return (
    <Svg width={20} height={32} viewBox="0 0 20 32" fill="none" {...props}>
      <Path
        fill="#005F73"
        d="M1.5 29.5a1.5 1.5 0 1 1 0-3h17a1.5 1.5 0 1 1 0 3h-17Zm8.5-8A1.5 1.5 0 0 1 8.5 20V5.15L3.495 9.196a1.422 1.422 0 0 1-1.81-2.194l7.043-5.93a1.975 1.975 0 0 1 2.545 0l7.043 5.93a1.422 1.422 0 0 1-1.81 2.194L11.5 5.15V20a1.5 1.5 0 0 1-1.5 1.5Z"
      />
    </Svg>
  );
});

import { SvgProps } from '@utils';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BattleSvg = React.memo<SvgProps>((props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill={props.fill ?? '#F6F4EF'}
        d="m19.05 21.7-2.925-2.9-1.5 1.5a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275c-.383-.383-.575-.858-.575-1.425 0-.567.192-1.042.575-1.425l4.225-4.225c.383-.383.858-.575 1.425-.575.567 0 1.042.192 1.425.575a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7l-1.5 1.5 2.9 2.925c.2.2.3.433.3.7 0 .267-.1.5-.3.7l-1.25 1.25c-.2.2-.433.3-.7.3a.96.96 0 0 1-.7-.3ZM21.7 6.3 10.65 17.35l.125.1c.383.383.575.858.575 1.425 0 .567-.192 1.042-.575 1.425a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275l-1.5-1.5-2.925 2.9c-.2.2-.433.3-.7.3a.96.96 0 0 1-.7-.3L2.3 20.45a.96.96 0 0 1-.3-.7c0-.267.1-.5.3-.7l2.9-2.925-1.5-1.5a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7.383-.383.858-.575 1.425-.575.567 0 1.042.192 1.425.575l.1.125L17.425 2.575a1.976 1.976 0 0 1 1.4-.575H21c.283 0 .521.096.713.288.192.192.288.43.287.712v2.575c0 .133-.025.263-.075.388a.987.987 0 0 1-.225.337ZM6.225 10.225l-3.65-3.65A1.974 1.974 0 0 1 2 5.175V3c0-.283.096-.52.288-.712A.972.972 0 0 1 3 2h2.175a1.978 1.978 0 0 1 1.4.575l3.65 3.65c.2.2.3.438.3.713a.97.97 0 0 1-.3.712L7.65 10.225c-.2.2-.437.3-.712.3a.976.976 0 0 1-.713-.3Z"
      />
    </Svg>
  );
});

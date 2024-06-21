import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Animated, { useDerivedValue } from 'react-native-reanimated';
import BaseAnimatedText from 'components/base/base-animated-text/BaseAnimatedText';
import { useGameContext } from 'pages/game-page/context/useGameContext';

interface GameCardAnswersTimeoutProps {}

const GameCardAnswersTimeout: React.FC<GameCardAnswersTimeoutProps> = ({}) => {
  const {} = useBaseAspect(aspectStyle);

  const { focusTimeout } = useGameContext();

  const text = useDerivedValue(() => {
    return Math.floor(focusTimeout.value).toString();
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: -72,
        left: 0,
        right: 0,
        height: 40,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      pointerEvents={'box-none'}>
      <BaseAnimatedText
        style={{
          fontFamily: 'Texturina-BoldItalic',
          fontSize: 32,
          lineHeight: 40,
          color: '#FFFFFF',
        }}
        text={text}
      />
    </Animated.View>
  );
};

export default GameCardAnswersTimeout;

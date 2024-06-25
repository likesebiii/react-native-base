import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Animated from 'react-native-reanimated';
import { Text } from 'react-native';

interface GameCardAnswersTitleProps {
  type: 'me' | 'enemy';
}

const GameCardAnswersTitle: React.FC<GameCardAnswersTitleProps> = ({
  type,
}) => {
  const {} = useBaseAspect(aspectStyle);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: -72,
        left: 0,
        right: 0,
        height: 40,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      pointerEvents={'box-none'}>
      <Text
        style={{
          fontFamily: 'Texturina-BoldItalic',
          fontSize: 32,
          lineHeight: 40,
          color: '#FFFFFF',
        }}>
        {type === 'enemy' ? 'My turn' : `Enemy's turn`}
      </Text>
    </Animated.View>
  );
};

export default GameCardAnswersTitle;

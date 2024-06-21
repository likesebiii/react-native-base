import React from 'react';
import { View, Text } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BOTTOM_CONTROLLER_BAR_HEIGHT } from 'pages/game-page/constants';
import { useGameContext } from 'pages/game-page/context/useGameContext';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import BaseAnimatedText from 'components/base/base-animated-text/BaseAnimatedText';
import { BasePressableScale } from 'components/base/base-pressable-scale/BasePressableScale';

interface GameBottomBarProps {}

const GameBottomBar: React.FC<GameBottomBarProps> = ({}) => {
  const { screenWidth } = useBaseAspect(aspectStyle);

  const { onEndTurn, turnEnergy, energyAnimation } = useGameContext();

  const energy = useDerivedValue(() => {
    return turnEnergy.value.toString();
  });

  const energyAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        energyAnimation.value,
        [0, 1],
        ['#84AFC2', '#44AFC2'],
      ),
      transform: [
        { scale: 1 + interpolate(energyAnimation.value, [0, 1], [0, 0.1]) },
      ],
    };
  });

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        height: BOTTOM_CONTROLLER_BAR_HEIGHT,
        zIndex: -1,
      }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 40,
            left: -screenWidth * 0.1,
            width: screenWidth * 0.4,
            borderRadius: 12,
            backgroundColor: '#D74141',
            alignItems: 'flex-end',
            paddingRight: 12,
            justifyContent: 'center',
          },
          {
            transform: [
              { rotate: '-15deg' },
              { translateY: screenWidth * 0.045 },
            ],
          },
        ]}>
        <Text
          style={{
            fontFamily: 'Texturina-Black',
            fontSize: 16,
            lineHeight: 20,
            color: '#F6F4EF',
          }}>
          {'RETREAT'}
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            height: 40,
            width: 40,
            backgroundColor: '#84AFC2',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          energyAnimatedStyle,
        ]}>
        <BaseAnimatedText
          style={{
            fontFamily: 'Texturina-Black',
            color: '#F6F4EF',
            fontSize: 24,
            lineHeight: 32,
          }}
          text={energy}
        />
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          right: -screenWidth * 0.1,
          bottom: 0,
          top: 0,
          height: 40,
          width: screenWidth * 0.4,
          borderRadius: 12,
          justifyContent: 'center',
          paddingLeft: 12,
          overflow: 'hidden',
          transform: [{ rotate: '15deg' }, { translateY: screenWidth * 0.045 }],
        }}>
        <BasePressableScale
          onPress={onEndTurn}
          containerStyle={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
            top: 0,
            backgroundColor: '#BA82C3',
            justifyContent: 'center',
            borderRadius: 12,
            paddingLeft: 12,
          }}>
          <Text
            style={{
              fontFamily: 'Texturina-Black',
              fontSize: 16,
              lineHeight: 20,
              color: '#F6F4EF',
            }}>
            {'END TURN'}
          </Text>
        </BasePressableScale>
      </View>
    </View>
  );
};

export default GameBottomBar;

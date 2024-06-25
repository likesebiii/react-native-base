import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import {
  TABLE_PLACEHOLDER_WIDTH,
  TABLE_PLACEHOLDER_HEIGHT,
  TABLE_REGION_HEIGHT,
  getEnemyTableRegion,
  getMyTableRegion,
} from 'pages/game-page/constants';
import { useGameContext } from 'pages/game-page/context/useGameContext';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

interface GameTableElementRegionProps {
  type: 'mine' | 'enemy';
  elementRegionOrder: 0 | 1 | 2;
}

const GameTableElementRegion: React.FC<GameTableElementRegionProps> = ({
  type,
  elementRegionOrder,
}) => {
  const { screenHeight } = useBaseAspect(aspectStyle);

  const { activeCardTranslateX, activeCardTranslateY, activeRegion } =
    useGameContext();
  const defaultTop =
    type === 'enemy'
      ? getEnemyTableRegion(screenHeight)
      : getMyTableRegion(screenHeight);
  const defaultLeft =
    elementRegionOrder * (2 * TABLE_PLACEHOLDER_WIDTH + 8 + 12 + 8);

  const top = defaultTop;
  const bottom = top + TABLE_REGION_HEIGHT;
  const left = defaultLeft;
  const right = defaultLeft + (2 * TABLE_PLACEHOLDER_WIDTH + 8 + 12 + 8);

  const active = useSharedValue(0);

  const changeActiveRegion = () => {
    'worklet';

    activeRegion.value = elementRegionOrder;
  };

  const removeActiveRegion = () => {
    'worklet';

    if (activeRegion.value === elementRegionOrder) {
      activeRegion.value = -1;
    }
  };

  useDerivedValue(() => {
    if (
      type === 'mine' &&
      activeCardTranslateX.value >= left &&
      activeCardTranslateX.value <= right &&
      activeCardTranslateY.value >= top &&
      activeCardTranslateY.value <= bottom
    ) {
      active.value = 1.0;

      changeActiveRegion();
    } else {
      active.value = 0;

      removeActiveRegion();
    }
  });

  const borderAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        active.value,
        [0, 1],
        ['#000000', '#FFFFFF'],
      ),
    };
  });

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: TABLE_REGION_HEIGHT - 8,
            left: defaultLeft + 8,
            width: 2 * TABLE_PLACEHOLDER_WIDTH + 8 + 16,
            right: 0,
            top: defaultTop + 4,
            zIndex: -1,
            borderRadius: TABLE_REGION_HEIGHT * 0.04,
            borderWidth: 1,
            borderStyle: 'dashed',
          },
          borderAnimatedStyle,
        ]}
        pointerEvents={'box-none'}
      />
      <View
        style={{
          position: 'absolute',
          top: defaultTop + 12,
          left: defaultLeft + 16,
          height: TABLE_PLACEHOLDER_HEIGHT,
          width: TABLE_PLACEHOLDER_WIDTH,
          borderWidth: 1,
          borderRadius: TABLE_PLACEHOLDER_HEIGHT * 0.04,
          zIndex: -1,
          borderStyle: 'dotted',
          opacity: 0,
        }}
        pointerEvents={'box-none'}
      />
      <View
        style={{
          position: 'absolute',
          top: defaultTop + 12,
          left: defaultLeft + 24 + TABLE_PLACEHOLDER_WIDTH,
          height: TABLE_PLACEHOLDER_HEIGHT,
          width: TABLE_PLACEHOLDER_WIDTH,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: TABLE_PLACEHOLDER_HEIGHT * 0.04,
          zIndex: -1,
          borderStyle: 'dotted',
          opacity: 0,
        }}
        pointerEvents={'box-none'}
      />
      <View
        style={{
          position: 'absolute',
          top: defaultTop + TABLE_PLACEHOLDER_HEIGHT + 20,
          left: defaultLeft + 16,
          height: TABLE_PLACEHOLDER_HEIGHT,
          width: TABLE_PLACEHOLDER_WIDTH,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: TABLE_PLACEHOLDER_HEIGHT * 0.04,
          zIndex: -1,
          borderStyle: 'dotted',
          opacity: 0,
        }}
        pointerEvents={'box-none'}
      />
      <View
        style={{
          position: 'absolute',
          top: defaultTop + TABLE_PLACEHOLDER_HEIGHT + 20,
          left: defaultLeft + 24 + TABLE_PLACEHOLDER_WIDTH,
          height: TABLE_PLACEHOLDER_HEIGHT,
          width: TABLE_PLACEHOLDER_WIDTH,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: TABLE_PLACEHOLDER_HEIGHT * 0.04,
          zIndex: -1,
          borderStyle: 'dotted',
          opacity: 0,
        }}
        pointerEvents={'box-none'}
      />
    </>
  );
};

export default GameTableElementRegion;

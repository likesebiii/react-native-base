import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import BattleGameCardsRow from '../battle-game-cards-row/BattleGameCardsRow';
import {
  BASE_BOTTOM_BAR_HEIGHT,
  BASE_HEADER_HEIGHT,
  randomValue,
  TOPIC_CONTENT_ACHIEVEMENTS,
} from '@utils';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Platform } from 'react-native';
import { Vibrations } from '@services';

export type BattleGameWheelRef = {
  spin?: (onFinish?: () => void) => number[];
};

const generateRandomAchievementId = () => {
  const val = randomValue(
    0,
    Object.keys(TOPIC_CONTENT_ACHIEVEMENTS).length - 0.1,
  );

  return Math.floor(val);
};

const generateCards = () => {
  return [
    generateRandomAchievementId(),
    generateRandomAchievementId(),
    generateRandomAchievementId(),
  ];
};

interface BattleGameWheelProps {
  onAchievementPress?: (id: number) => void;
}

const BattleGameWheel = React.forwardRef<any, BattleGameWheelProps>(
  ({ onAchievementPress }, ref) => {
    const { screenHeight, screenWidth } = useBaseAspect(aspectStyle);

    const animated = useSharedValue(2);

    const [index, setIndex] = React.useState<number>();

    const POSSIBLE_HEIGHT =
      (screenHeight - BASE_BOTTOM_BAR_HEIGHT - BASE_HEADER_HEIGHT) / 3;
    const POSSIBLE_WIDTH = (screenWidth - 24 - 24 - 16 - 16) / 3;
    const CARD_HEIGHT = Math.min(POSSIBLE_WIDTH * 1.32, POSSIBLE_HEIGHT / 1.7);
    const CARD_WIDTH = CARD_HEIGHT / 1.32;
    const CENTER = (screenWidth - CARD_WIDTH * 3 - 16 - 16 - 24 - 24) / 2;

    const cards = React.useMemo(
      () => [
        generateCards(),
        generateCards(),
        generateCards(),
        generateCards(),
      ],
      [],
    );

    const [gray, setGray] = React.useState([true, true, true, true]);

    const changeIndex = (index?: number) => {
      setTimeout(() => {
        setIndex(index);
      }, 500);
    };

    const spin = (onFinish?: () => void) => {
      changeIndex(undefined);

      setTimeout(
        () => {
          const random = Math.ceil(randomValue(15, 40));
          const value = Math.abs(animated.value - random);

          const array: boolean[] = [true, true, true, true];
          const chosenIndex = 4 - (value % 4 === 0 ? 4 : value % 4);

          setTimeout(() => {
            setGray(array);
          }, 500);
          setTimeout(() => {
            array[chosenIndex] = false;
            setGray([...array]);
          }, 2000);

          cancelAnimation(animated);
          animated.value = withTiming(
            -value,
            { duration: 3000 },
            (finished) => {
              if (finished) {
                runOnJS(changeIndex)(chosenIndex);
                onFinish && runOnJS(onFinish)();
              }
            },
          );
        },
        index === undefined ? 0 : 1000,
      );

      return cards[index ?? -1];
    };

    const lastAnimatedValue = useSharedValue(animated.value);

    const vibrate = () => {
      Vibrations.trigger('light');
    };

    useDerivedValue(() => {
      if (Math.round(animated.value) !== lastAnimatedValue.value) {
        lastAnimatedValue.value = Math.round(animated.value);
        runOnJS(vibrate)();
      }
    });

    React.useImperativeHandle(ref, () => ({ spin }));

    const opacityAnimatedStyle = useAnimatedStyle(() => {
      return {
        zIndex: 0,
        opacity:
          index !== undefined ? withDelay(100, withTiming(0)) : withTiming(1),
      };
    }, [index]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        zIndex: index === undefined ? withTiming(0) : withTiming(1),
        opacity: index === undefined ? withTiming(0) : withTiming(1),
        transform: [
          {
            translateX:
              index === undefined
                ? withTiming(-CARD_WIDTH * 0.8)
                : withTiming(
                    (-CARD_WIDTH / 4) * (Platform.OS === 'ios' ? 4 : 4.5),
                  ),
          },
          {
            translateY:
              index === undefined
                ? withTiming(0)
                : withTiming(
                    (-CARD_HEIGHT / 1.6) * (Platform.OS === 'ios' ? 4 : 4.5),
                  ),
          },

          {
            scale: index === undefined ? withTiming(0.5) : withTiming(1),
          },
          {
            translateX:
              index === undefined
                ? withTiming(0)
                : withTiming(
                    (-CARD_WIDTH / 4.2 / 2) * (Platform.OS === 'ios' ? 4 : 4.5),
                  ),
          },
          {
            translateY:
              index === undefined
                ? withTiming(0)
                : withTiming(-CARD_HEIGHT / 4),
          },
        ],
      };
    }, [index]);

    return (
      <Animated.View
        style={[
          {
            marginTop: 24,
            height: CARD_HEIGHT * (Platform.OS === 'ios' ? 2.25 : 2.55),
            marginLeft: CENTER,
          },
        ]}>
        <Animated.View
          style={[
            {
              transform: [{ translateY: -CARD_HEIGHT * 1.65 }],
            },
          ]}>
          <Animated.View style={opacityAnimatedStyle}>
            <BattleGameCardsRow
              index={0}
              cardHeight={CARD_HEIGHT}
              animated={animated}
              cards={cards[0]}
              gray={gray[0]}
            />
            <BattleGameCardsRow
              index={1}
              cardHeight={CARD_HEIGHT}
              animated={animated}
              cards={cards[1]}
              gray={gray[1]}
            />
            <BattleGameCardsRow
              index={2}
              cardHeight={CARD_HEIGHT}
              animated={animated}
              cards={cards[2]}
              gray={gray[2]}
            />
            <BattleGameCardsRow
              index={3}
              cardHeight={CARD_HEIGHT}
              animated={animated}
              cards={cards[3]}
              gray={gray[3]}
            />
          </Animated.View>
          <Animated.View style={animatedStyle}>
            {index !== undefined ? (
              <BattleGameCardsRow
                index={index % 4}
                cardHeight={CARD_HEIGHT * 2}
                animated={animated}
                cards={cards[index]}
                gray={gray[index]}
                onAchievementPress={onAchievementPress}
                disableScroll={false}
              />
            ) : undefined}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  },
);

export default BattleGameWheel;

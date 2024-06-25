import { Platform } from 'react-native';
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const useBattleGameCardsAnimations = ({
  cardHeight,
  index,
  animated,
}: {
  cardHeight: number;
  index: number;
  animated: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const distance1 = cardHeight - 16;
    const distance2 = cardHeight + 16;

    return {
      transform: [
        {
          translateY: interpolate(
            index,
            [0, 1, 2, 3],
            [
              cardHeight * (1 + ((2 - animated.value) % 4)),
              cardHeight * (1 + ((3 - animated.value) % 4)),
              cardHeight * (1 + ((4 - animated.value) % 4)),
              cardHeight * (1 + ((5 - animated.value) % 4)),
            ],
          ),
        },
        {
          translateY: interpolate(
            index,
            [0, 1, 2, 3],
            [
              (animated.value * distance1) / 2 -
                ((Math.ceil((-2 + animated.value) / 4) * 4) / 2) * distance1,
              ((animated.value - 1) * distance1) / 2 -
                ((Math.ceil((-3 + animated.value) / 4) * 4) / 2) * distance1,
              ((animated.value - 2) * distance1) / 2 -
                ((Math.ceil((-4 + animated.value) / 4) * 4) / 2) * distance1,
              ((animated.value - 3) * distance1) / 2 -
                ((Math.ceil((-5 + animated.value) / 4) * 4) / 2) * distance1,
            ],
          ),
        },
        { perspective: Platform.OS === 'ios' ? 400 : -25000 },
        {
          rotateX: `${interpolate(
            index,
            [0, 1, 2, 3],
            [
              animated.value * 50 - Math.ceil((-2 + animated.value) / 4) * 200,
              (animated.value - 1) * 50 -
                Math.ceil((-3 + animated.value) / 4) * 200,
              (animated.value - 2) * 50 -
                Math.ceil((-4 + animated.value) / 4) * 200,
              (animated.value - 3) * 50 -
                Math.ceil((-5 + animated.value) / 4) * 200,
            ],
          )}deg`,
        },
        {
          translateY: interpolate(
            index,
            [0, 1, 2, 3],
            [
              -(
                (animated.value * distance2) / 2 -
                ((Math.ceil((-2 + animated.value) / 4) * 4) / 2) * distance2
              ),
              -(
                ((animated.value - 1) * distance2) / 2 -
                ((Math.ceil((-3 + animated.value) / 4) * 4) / 2) * distance2
              ),
              -(
                ((animated.value - 2) * distance2) / 2 -
                ((Math.ceil((-4 + animated.value) / 4) * 4) / 2) * distance2
              ),
              -(
                ((animated.value - 3) * distance2) / 2 -
                ((Math.ceil((-5 + animated.value) / 4) * 4) / 2) * distance2
              ),
            ],
          ),
        },
      ],
    };
  });

  return {
    animatedStyle,
  };
};

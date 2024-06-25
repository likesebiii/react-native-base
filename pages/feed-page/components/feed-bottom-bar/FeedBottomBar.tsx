import React from 'react';
import { Platform, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { QuestionSvg, RetrySvg, UpgradeSvg } from '@svgs';
import { ACTIVE_OPACITY, BASE_BOTTOM_BAR_HEIGHT, EMPTY_FUNCTION } from '@utils';
import { getCardHeight } from 'pages/topic-page/constants';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Analytics } from '@services';
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface FeedBottomBarProps {
  bottomInset?: number;
  type?: 'question' | 'retry' | 'upgrade';
}

export const FEED_BOTTOM_BAR_CONTROLLER: {
  questionAnimate?: (state: 'animate' | 'stop') => void;
} = {};

const FeedBottomBar: React.FC<FeedBottomBarProps> = ({
  bottomInset,
  type = 'question',
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const { simulateGestureRef } = useTopicContext();

  const animated = useSharedValue(0);

  const animateState = React.useRef('stop');

  const ComponentSvg =
    type === 'question'
      ? QuestionSvg
      : type === 'retry'
      ? RetrySvg
      : UpgradeSvg;

  const onComponentPress = () => {
    Analytics.log(
      'tapElement',
      { location: 'feed-bottom-bar', element: type },
      ['amplitude'],
    );
    simulateGestureRef.current?.('down');
  };

  const onStop = () => {
    cancelAnimation(animated);
    animated.value = 0;
    animateState.current = 'stop';
  };

  const onAnimate = () => {
    onStop();
    animated.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 0 }),
      ),
      -1,
    );
    animateState.current = 'animated';
  };

  const animate = (state: 'animate' | 'stop') => {
    if (animateState.current === state) {
      return;
    }

    if (state === 'animate') {
      onAnimate();
    } else {
      onStop();
    }
  };

  React.useEffect(() => {
    if (FEED_BOTTOM_BAR_CONTROLLER.questionAnimate === undefined) {
      FEED_BOTTOM_BAR_CONTROLLER.questionAnimate = animate;

      return () => {
        if (FEED_BOTTOM_BAR_CONTROLLER.questionAnimate === animate) {
          FEED_BOTTOM_BAR_CONTROLLER.questionAnimate = undefined;
        }
      };
    } else {
      return EMPTY_FUNCTION;
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animated.value, [0, 1], [1, 0.1]),
      transform: [{ scale: interpolate(animated.value, [0, 1], [1, 2]) }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          bottom:
            BASE_BOTTOM_BAR_HEIGHT -
            (bottomInset ?? 0) +
            ((screenHeight - getCardHeight(screenHeight)) / 2 -
              BASE_BOTTOM_BAR_HEIGHT) -
            60 -
            (Platform.OS === 'android' ? 12 : 0) -
            16,
        },
      ]}
      pointerEvents={'box-none'}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        onPress={onComponentPress}>
        <View style={{ height: 46, width: 46 }}>
          <ComponentSvg
            height={type === 'upgrade' ? 42 : 46}
            width={type === 'upgrade' ? 42 : 46}
          />
        </View>
        <Animated.View
          style={[
            {
              height: 46,
              width: 46,
              position: 'absolute',
            },
            animatedStyle,
          ]}>
          <ComponentSvg
            height={type === 'upgrade' ? 42 : 46}
            width={type === 'upgrade' ? 42 : 46}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default FeedBottomBar;

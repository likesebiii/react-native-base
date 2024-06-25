import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import LottieView from 'lottie-react-native';
import { getCardHeight } from 'pages/topic-page/constants';

export type WelcomePageHandLottieRef = {
  animate: (type: 'start' | 'stop') => void;
};

export type WelcomePageHandLottieProps =
  | { autoplay?: boolean } & (
      | {
          type: 'horizontal';
          direction: 'right' | 'left' | 'right-left' | 'left-right';
        }
      | { type: 'vertical'; direction: 'up' | 'down' | 'up-down' }
    );

const LOTTIE_HORIZONTAL = require('resources/animations/swipe-horizontal.json');
const LOTTIE_VERTICAL = require('resources/animations/swipe-vertical.json');

const DEFAULT_TIMEOUT = 1800;

const WelcomePageHandLottie = React.forwardRef<
  WelcomePageHandLottieRef,
  WelcomePageHandLottieProps
>(({ type, direction, autoplay = true }, ref) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const lottieRef = React.useRef<LottieView>(null);

  const directionRef = React.useRef<'right' | 'left' | 'up' | 'down'>(
    type === 'horizontal'
      ? direction === 'right' || direction === 'right-left'
        ? 'right'
        : 'left'
      : direction === 'up' || direction === 'up-down'
      ? 'up'
      : 'down',
  );

  const intervalRef = React.useRef<NodeJS.Timeout>();

  const play = () => {
    lottieRef.current?.play(
      directionRef.current === 'right' || directionRef.current === 'up'
        ? 0
        : 100,
      directionRef.current === 'right' || directionRef.current === 'up'
        ? 100
        : 0,
    );

    if (direction === 'right-left' || direction === 'left-right') {
      if (directionRef.current === 'right') {
        directionRef.current = 'left';
      } else {
        directionRef.current = 'right';
      }
    } else if (direction === 'up-down') {
      if (directionRef.current === 'up') {
        directionRef.current = 'down';
      } else {
        directionRef.current = 'up';
      }
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    lottieRef.current?.reset();
  };

  const animate = (type: 'start' | 'stop') => {
    if (type === 'stop') {
      stop();
    } else {
      play();
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(play, DEFAULT_TIMEOUT);
    }
  };

  React.useEffect(() => {
    if (autoplay) {
      animate('start');
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  React.useImperativeHandle(ref, () => ({ animate }));

  return (
    <View
      style={[
        styles.container,
        {
          bottom: (screenHeight - getCardHeight(screenHeight)) / 2,
        },
      ]}
      pointerEvents={'none'}>
      <LottieView
        source={type === 'horizontal' ? LOTTIE_HORIZONTAL : LOTTIE_VERTICAL}
        ref={lottieRef}
        speed={0.6}
        loop={false}
        hardwareAccelerationAndroid
        resizeMode={'cover'}
        style={type === 'horizontal' ? styles.horizontal : styles.vertical}
      />
    </View>
  );
});

export default WelcomePageHandLottie;

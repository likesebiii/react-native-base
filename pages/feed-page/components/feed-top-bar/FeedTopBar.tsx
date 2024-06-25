import React from 'react';
import { Text, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { CardsSvg, LivesSvg, StreakSvg } from '@svgs';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { PADDING_TOP_LIVES } from 'pages/topic-page/constants';
import { BaseImage } from 'components/base/base-image/BaseImage';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  ACTIVE_OPACITY,
  MAX_TEXT_SIZE_MULTIPLIER,
  changeOpacityOfRgbaColor,
  hexColorToRgba,
} from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import { Analytics, useSelectVortex } from '@services';
import { colors } from '@theme';

interface FeedTopBarProps {
  bottomInset?: number;
  enableAvatar?: boolean;
  enableGradient?: boolean;
  enableGift?: boolean;
  disableTap?: boolean;
  index?: number;
}

const AVATAR_1_PHOTO = require('resources/assets/avatar.jpg');

const BaseAnimatedText = Animated.createAnimatedComponent(Text);

const FeedTopBar: React.FC<FeedTopBarProps> = ({
  bottomInset,
  enableAvatar = false,
  enableGradient = false,
  enableGift = false,
  disableTap = false,
  index,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const gradient = [
    changeOpacityOfRgbaColor(
      hexColorToRgba(colors[theme].main.primaryBackground),
      0.5,
    ),
    changeOpacityOfRgbaColor(
      hexColorToRgba(colors[theme].main.primaryBackground),
      0.3,
    ),
    changeOpacityOfRgbaColor(
      hexColorToRgba(colors[theme].main.primaryBackground),
      0,
    ),
  ];

  const lives = useSelectVortex('user-vortex', 'selectUserLives');
  const streak = useSelectVortex('user-vortex', 'selectUserCurrentStreak');

  const [displayLives, setDisplayLives] = React.useState(lives);
  const [displayStreak, setDisplayStreak] = React.useState(streak);

  const livesAnimated = useSharedValue(0);
  const cardsAnimated = useSharedValue(0);
  const streakAnimated = useSharedValue(0);
  const giftAnimated = useSharedValue(0);

  const allCollectedQuestions = useSelectVortex(
    'user-vortex',
    'selectCollectedQuestions',
  );

  const streakEnabled = useSharedValue(streak);

  const shouldShowFeedback = useSelectVortex(
    'user-vortex',
    'selectShouldShowFeedback',
  );

  const onProfilePress = (element?: string) => {
    if (disableTap) {
      return;
    }

    NAVIGATION_CONTROLLER.navigate('fk.ProfilePage', {});
    Analytics.log(
      'tapElement',
      { location: 'feed-top-bar', element: element ?? 'avatar' },
      ['amplitude'],
    );
  };

  const onAvatarPress = () => onProfilePress('avatar');

  const onLivesPress = () => {
    if (disableTap) {
      return;
    }

    NAVIGATION_CONTROLLER.navigate('fk.LivesDrawer', {});
    Analytics.log(
      'tapElement',
      { location: 'feed-top-bar', element: 'lives' },
      ['amplitude'],
    );
  };

  const onCardsPress = () => onProfilePress('cards');
  const onStreakPress = () => onProfilePress('streak');

  const onGiftPress = () => {
    if (disableTap) {
      return;
    }

    NAVIGATION_CONTROLLER.navigate('fk.FeedbackDrawer', {});
    Analytics.log('tapElement', { location: 'feed-top-bar', element: 'gift' }, [
      'amplitude',
    ]);
  };

  const firstItem = useSharedValue(1);

  React.useEffect(() => {
    if (shouldShowFeedback && enableGift) {
      cancelAnimation(giftAnimated);
      giftAnimated.value = withRepeat(
        withSequence(
          withTiming(0),
          withDelay(1000, withTiming(1, { easing: Easing.elastic(1) })),
          withTiming(0, { easing: Easing.linear }),
          withTiming(1, { easing: Easing.linear }),
          withTiming(0, { easing: Easing.linear }),
        ),
        -1,
      );
    } else {
      cancelAnimation(giftAnimated);
      giftAnimated.value = 0;
    }
  }, [shouldShowFeedback, enableGift]);

  React.useEffect(() => {
    if (firstItem.value) {
      return;
    }

    cardsAnimated.value = withTiming(1.0, { duration: 1000 }, () => {
      cardsAnimated.value = 0;
    });
  }, [allCollectedQuestions.length]);

  const giftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(giftAnimated.value, [0, 1], [1, 1.2]),
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        streakEnabled.value,
        [0, 1, 1000],
        ['#8B8579', '#FF7324', '#FF7324'],
      ),
    };
  }, [streak]);

  const animatedLivesStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            livesAnimated.value,
            [0, 0.25, 0.5, 0.75, 1],
            [1, 1.4, 1, 1.4, 1],
          ),
        },
      ],
    };
  });

  const animatedCardsStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            cardsAnimated.value,
            [0, 0.25, 0.5, 0.75, 1],
            [1, 1.4, 1, 1.4, 1],
          ),
        },
      ],
    };
  });

  const animatedStreakStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            streakAnimated.value,
            [0, 0.25, 0.5, 0.75, 1],
            [1, 1.4, 1, 1.4, 1],
          ),
        },
      ],
    };
  });

  React.useEffect(() => {
    if (lives === displayLives - 1) {
      livesAnimated.value = withTiming(1.0, { duration: 1000 }, () => {
        runOnJS(setDisplayLives)(lives);
        livesAnimated.value = 0;
      });
    } else {
      setDisplayLives(lives);
    }
  }, [lives]);

  React.useEffect(() => {
    if (streak === displayStreak + 1) {
      streakEnabled.value = withTiming(1.0, { duration: 1000 });
      streakAnimated.value = withTiming(1.0, { duration: 1000 }, () => {
        runOnJS(setDisplayStreak)(streak);
        streakAnimated.value = 0;
      });
    } else if (streak < displayStreak) {
      if (streak === 0) {
        streakEnabled.value = 0;
      }
      setDisplayStreak(streak);
    }
  }, [streak]);

  const entering = () => {
    'worklet';

    if (firstItem.value) {
      firstItem.value = 0;

      return { initialValues: {}, animations: {} };
    }

    const animations = {
      opacity: withDelay(300, withDelay(50, withTiming(1, { duration: 200 }))),
      transform: [
        {
          translateY: withDelay(300, withTiming(0, { duration: 300 })),
        },
      ],
    };

    const initialValues = {
      opacity: 0,
      transform: [{ translateY: -48 }],
    };

    return {
      initialValues,
      animations,
    };
  };

  const exiting = () => {
    'worklet';

    if (firstItem.value) {
      firstItem.value = 0;

      return { initialValues: {}, animations: {} };
    }

    const animations = {
      opacity: withDelay(250, withTiming(0, { duration: 300 })),
      transform: [
        {
          translateY: withDelay(
            250,
            withDelay(100, withTiming(48, { duration: 200 })),
          ),
        },
      ],
    };

    const initialValues = {
      opacity: 1,
      transform: [{ translateY: 0 }],
    };

    return {
      initialValues,
      animations,
    };
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: PADDING_TOP_LIVES - (bottomInset ?? 0) / 4,
          opacity: index === 2 ? 0 : 1,
        },
      ]}
      pointerEvents={index === 2 ? 'none' : 'box-none'}>
      <>
        {enableGradient ? (
          <LinearGradient
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.8, 1]}
            colors={gradient}
            style={styles.gradient}
          />
        ) : undefined}
        <View pointerEvents={'box-none'}>
          <View style={styles.row}>
            {enableAvatar ? (
              <TouchableOpacity
                style={styles.firstImage}
                activeOpacity={disableTap ? 1 : ACTIVE_OPACITY}
                onPress={onAvatarPress}>
                <BaseImage
                  source={AVATAR_1_PHOTO}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : undefined}
            <TouchableOpacity
              style={styles.row}
              activeOpacity={disableTap ? 1 : ACTIVE_OPACITY}
              onPress={onLivesPress}>
              <Animated.View style={animatedLivesStyle}>
                <LivesSvg height={32} width={32} />
              </Animated.View>
              <BaseText type={'texturina-34-regular'} style={styles.livesText}>
                {displayLives}
              </BaseText>
            </TouchableOpacity>
          </View>
        </View>
        <View pointerEvents={'box-none'} style={styles.row}>
          <TouchableOpacity
            style={styles.cardsContainer}
            activeOpacity={disableTap ? 1 : ACTIVE_OPACITY}
            onPress={onCardsPress}>
            <Animated.View
              style={styles.cardsRow}
              entering={entering}
              exiting={exiting}
              key={`feed-top-bar-cards-count-${allCollectedQuestions.length}`}>
              <BaseAnimatedText
                style={[styles.text, styles.cardsText]}
                maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}>
                {allCollectedQuestions.length}
              </BaseAnimatedText>
            </Animated.View>
            <Animated.View style={animatedCardsStyle}>
              <CardsSvg height={32} width={32} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            activeOpacity={disableTap ? 1 : ACTIVE_OPACITY}
            onPress={onStreakPress}>
            <BaseAnimatedText
              style={[styles.text, textStyle]}
              maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}>
              {streak}
            </BaseAnimatedText>
            <Animated.View style={animatedStreakStyle}>
              <StreakSvg
                height={32}
                width={32}
                fill={streak === 0 ? '#8B8579' : undefined}
              />
            </Animated.View>
          </TouchableOpacity>
          {enableGift ? (
            <TouchableOpacity
              activeOpacity={disableTap ? 1 : ACTIVE_OPACITY}
              onPress={onGiftPress}>
              <Animated.View style={giftStyle}>
                <BaseText style={styles.gift}>{'🎁'}</BaseText>
              </Animated.View>
            </TouchableOpacity>
          ) : undefined}
        </View>
      </>
    </View>
  );
};

export default FeedTopBar;

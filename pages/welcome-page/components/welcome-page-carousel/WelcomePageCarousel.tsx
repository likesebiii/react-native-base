import React from 'react';
import { FlatList, View, ViewToken, ViewabilityConfig } from 'react-native';
import { useBaseForwardRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageCarouselComponent from '../welcome-page-carousel-component/WelcomePageCarouselComponent';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type WelcomePageCarouselProps = {
  welcomeScene: SharedValue<number>;
  welcomeSceneState: number;
  onScroll: (index: number) => void;
};

const DATA = [0, 1, 2];

const VIEWABILITY_CONFIG: ViewabilityConfig = {
  waitForInteraction: false,
  minimumViewTime: 50,
  itemVisiblePercentThreshold: 70,
};

const WelcomePageCarousel: React.FC<WelcomePageCarouselProps> = ({
  welcomeScene,
  welcomeSceneState,
  onScroll,
}) => {
  const { styles, screenWidth } = useBaseAspect(aspectStyle);

  const prevWelcomeSceneState = React.useRef(welcomeSceneState);

  const [flatListRef, flatListForwardList] = useBaseForwardRef<FlatList>();

  const firstDotStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(welcomeScene.value, [0, 1, 2], [1, 0.4, 0.4]),
    };
  });

  const secondDotStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(welcomeScene.value, [0, 1, 2], [0.4, 1, 0.4]),
    };
  });

  const thirdDotStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(welcomeScene.value, [0, 1, 2], [0.4, 0.4, 1]),
    };
  });

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < DATA.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const onScrollToIndexFailed = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({
        animated: true,
      });
    }
  };

  React.useEffect(() => {
    if (prevWelcomeSceneState.current === welcomeSceneState - 1) {
      scrollToIndex(welcomeSceneState);
    }

    prevWelcomeSceneState.current = welcomeSceneState;
  }, [welcomeSceneState]);

  const onViewableItemsChanged = React.useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      const index = viewableItems[0]?.index;

      if (index !== null && index !== undefined) {
        onScroll(index);
      }
    },
    [],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: number; index: number }) => {
      return (
        <View style={styles.item}>
          <WelcomePageCarouselComponent welcomeSceneState={item} />
        </View>
      );
    },
    [],
  );

  const getItemLayout = React.useCallback(
    (_: any, index: number) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index,
    }),
    [],
  );

  const keyExtractor = React.useCallback((item: number, index: number) => {
    return `welcome-page-carousel-${item}-${index}`;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[0, 1, 2]}
        ref={flatListForwardList}
        horizontal
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScrollToIndexFailed={onScrollToIndexFailed}
        scrollsToTop={false}
        alwaysBounceVertical={false}
        bounces={false}
        alwaysBounceHorizontal={false}
        bouncesZoom={false}
        snapToAlignment={'center'}
        decelerationRate={0}
        overScrollMode={'never'}
        snapToInterval={screenWidth}
        disableIntervalMomentum={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'never'}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
      />
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.firstDot, firstDotStyle]} />
        <Animated.View style={[styles.otherDot, secondDotStyle]} />
        <Animated.View style={[styles.otherDot, thirdDotStyle]} />
      </View>
    </View>
  );
};

export default WelcomePageCarousel;

import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageCarouselFirstComponent from './components/welcome-page-carousel-first-component/WelcomePageCarouselFirstComponent';
import WelcomePageCarouselSecondComponent from './components/welcome-page-carousel-second-component/WelcomePageCarouselSecondComponent';
import Animated from 'react-native-reanimated';
import WelcomePageCarouselThirdComponent from './components/welcome-page-carousel-third-component/WelcomePageCarouselThirdComponent';

type WelcomePageCarouselComponentProps = {
  welcomeSceneState: number;
};

const WelcomePageCarouselComponent: React.FC<
  WelcomePageCarouselComponentProps
> = ({ welcomeSceneState }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const firstScene = React.useMemo(() => {
    return <WelcomePageCarouselFirstComponent />;
  }, []);

  const secondScene = React.useMemo(() => {
    return <WelcomePageCarouselSecondComponent />;
  }, []);

  const thirdScene = React.useMemo(() => {
    return <WelcomePageCarouselThirdComponent />;
  }, []);

  const renderSceneRecord: Record<number, JSX.Element> = {
    0: firstScene,
    1: secondScene,
    2: thirdScene,
  };

  const scene = React.useMemo(
    () => renderSceneRecord[welcomeSceneState],
    [welcomeSceneState],
  );

  return (
    <Animated.View
      style={styles.container}
      key={`welcome-page-carousel-component-${welcomeSceneState}`}>
      {scene}
    </Animated.View>
  );
};

export default WelcomePageCarouselComponent;

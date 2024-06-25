import React from 'react';
import { useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import FeedTopBar from 'pages/feed-page/components/feed-top-bar/FeedTopBar';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import { BottomBarData } from '@types';
import RootBottomBar from '../root-bottom-bar/RootBottomBar';
import FeedTab from 'pages/feed-page/components/feed-tab/FeedTab';
import { Analytics, Vortex } from '@services';
import TopicsMapTable from 'pages/topics-map-page/topics-map-table/TopicsMapTable';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import BattleTab from 'pages/battle-page/components/battle-tab/BattleTab';
import SplashPage from 'pages/splash-page/SplashPage';

export const ROOT_TABS_CONTROLLER: { changeTab?: (index: number) => void } = {};

interface RootPageContentProps {}

const renderScene = SceneMap({
  feed: () => <FeedTab />,
  map: () => <TopicsMapTable />,
  game: () => <BattleTab />,
});

const RootPageContent: React.FC<RootPageContentProps> = ({}) => {
  const { screenWidth } = useBaseAspect(aspectStyle);

  const [index, setIndex, indexRef] = useBaseStateAndRef(0);
  const [routes] = React.useState([
    { key: 'feed', title: 'Feed' },
    { key: 'map', title: 'Map' },
    { key: 'game', title: 'Game' },
  ]);

  const onIndexChange = (newIndex: number) => {
    const previousIndex = indexRef.current;

    setIndex(newIndex);

    const previousScene = routes[previousIndex].key;
    const newScene = routes[newIndex].key;

    Analytics.log('changeTab', { tab: newScene, from: previousScene }, [
      'amplitude',
    ]);

    if (newScene === 'map') {
      if (Vortex.getObject('user-vortex').setup.enteredMap === false) {
        Vortex.dispatch('user-vortex', 'changeSetupEnteredMap')(true);
        setTimeout(() => {
          NAVIGATION_CONTROLLER.navigate(
            'fk.AchievementsExplanationDrawer',
            {},
          );
        }, 250);
      }
    }
  };

  const bottomTabBarComponent = React.useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<BottomBarData>;
      },
    ) => <RootBottomBar bottomBarPros={props} index={index} />,
    [index],
  );

  const renderLazyPlaceholder = React.useCallback(() => {
    return <SplashPage />;
  }, []);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<BottomBarData>;
    },
  ) => {
    return bottomTabBarComponent(props);
  };

  React.useEffect(() => {
    ROOT_TABS_CONTROLLER.changeTab = onIndexChange;

    return () => {
      if (onIndexChange === ROOT_TABS_CONTROLLER.changeTab) {
        ROOT_TABS_CONTROLLER.changeTab = undefined;
      }
    };
  }, []);

  return (
    <>
      <FeedTopBar enableAvatar index={index} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        initialLayout={{ width: screenWidth }}
        tabBarPosition={'bottom'}
        lazy={true}
        renderTabBar={renderTabBar}
        animationEnabled={false}
        renderLazyPlaceholder={renderLazyPlaceholder}
        swipeEnabled={false}
      />
    </>
  );
};

export default RootPageContent;

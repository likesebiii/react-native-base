import React from 'react';
import { View } from 'react-native';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view';
import { aspectStyle } from './aspect';
import { useBaseAspect } from '@hooks';
import { BottomBarData } from '@types';
import { changeOpacityOfRgbaColor, hexColorToRgba } from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '@theme';
import RootBottomBarItem from '../root-bottom-bar-item/RootBottomBarItem';

type RootBottomBarProps = {
  bottomBarPros: SceneRendererProps & {
    navigationState: NavigationState<BottomBarData>;
  };
  index: number;
};

const RootBottomBar: React.FC<RootBottomBarProps> = ({
  bottomBarPros,
  index,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const onPress = (route: BottomBarData) => {
    bottomBarPros.jumpTo(route.key);
  };

  return (
    <View pointerEvents={'box-none'}>
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 0.2 }}
          end={{ x: 0, y: 0.8 }}
          locations={[0, 1]}
          colors={[
            changeOpacityOfRgbaColor(
              hexColorToRgba(colors[theme].main.primaryBackground),
              0.7,
            ),
            hexColorToRgba(colors[theme].main.primaryBackground),
          ]}
          style={styles.container}
        />
        <View style={styles.content}>
          {bottomBarPros.navigationState.routes.map((route, routeIndex) => {
            return (
              <View style={styles.item} key={route.key + index}>
                <RootBottomBarItem
                  onPress={onPress.bind(null, route)}
                  type={route.key}
                  active={index === routeIndex}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default RootBottomBar;

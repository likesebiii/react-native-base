import React from 'react';
import { View } from 'react-native';
import { NavigationTabType } from '@types';
import { aspectStyle } from './aspect';
import { useBaseAspect } from '@hooks';
import { BasePressableScale } from 'components/base/base-pressable-scale/BasePressableScale';
import { SvgProps } from '@utils';
import { FeedTabSvg, MapTabSvg, GameTabSvg } from '@svgs';

type RootBottomBarItemProps = {
  onPress: () => void;
  type: string;
  active: boolean;
};

const ICONS_MAP: Record<
  NavigationTabType,
  React.NamedExoticComponent<SvgProps & { active?: boolean }>
> = {
  feed: FeedTabSvg,
  map: MapTabSvg,
  game: GameTabSvg,
};

const RootBottomBarItem: React.FC<RootBottomBarItemProps> = ({
  onPress,
  type,
  active = false,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const Icon = ICONS_MAP[type];

  return (
    <BasePressableScale onPress={onPress} containerStyle={styles.button}>
      <View style={styles.svg}>
        <Icon active={active} height={32} />
      </View>
    </BasePressableScale>
  );
};

export default RootBottomBarItem;

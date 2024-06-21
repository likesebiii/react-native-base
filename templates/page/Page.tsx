import { useBaseAspect } from '@hooks';
import { FunctionalComponent } from '@types';
import BaseNavigation, {
  BaseNavigationGenericProps,
} from 'components/base/base-navigation/BaseNavigation';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { PageProps } from '../utils';
import { aspectStyle } from './aspect';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import PageBackHandlerListener from './components/PageBackHandlerListener';

type PageComponentProps = {
  navigation?: BaseNavigationGenericProps;
  style?: StyleProp<ViewStyle>;
  animatedStyle?: AnimatedStyle<ViewStyle>;
};

const Page: FunctionalComponent<PageComponentProps & PageProps> = ({
  navigation,
  children,
  style,
  animatedStyle,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const onClose = () => {
    if (navigation?.onClose) {
      navigation.onClose?.();
    } else {
      NAVIGATION_CONTROLLER.close();
    }
  };

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      {children}
      {navigation ? (
        <BaseNavigation navigationProps={{ ...navigation, onClose }} />
      ) : undefined}
      {navigation?.backHandler ? (
        <PageBackHandlerListener onClose={navigation.onClose} />
      ) : undefined}
    </Animated.View>
  );
};

export default Page;

import React from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type BottomSheetBaseBackgroundProps = BottomSheetBackdropProps & {
  onPress?: () => void;
  animatedStyle: AnimatedStyle<ViewStyle>;
};

const BottomSheetBaseBackground: React.FC<BottomSheetBaseBackgroundProps> = ({
  onPress,
  animatedStyle,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, animatedStyle]} />
    </TouchableWithoutFeedback>
  );
};

export default BottomSheetBaseBackground;

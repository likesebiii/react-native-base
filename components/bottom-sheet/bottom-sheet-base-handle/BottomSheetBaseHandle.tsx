import React from 'react';
import Animated from 'react-native-reanimated';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BottomSheetHandleProps } from '@gorhom/bottom-sheet';

type BottomSheetBaseHandleProps = BottomSheetHandleProps & {};

const BottomSheetBaseHandle: React.FC<BottomSheetBaseHandleProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return <Animated.View style={styles.container} />;
};

export default BottomSheetBaseHandle;

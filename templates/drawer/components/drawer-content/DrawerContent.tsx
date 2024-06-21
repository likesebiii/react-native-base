import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { FunctionalComponent } from '@types';
import DrawerHeader from '../drawer-header/DrawerHeader';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

type DrawerContentProps = {
  title?: string;
  scrollable?: boolean;
};

const DrawerContent: FunctionalComponent<DrawerContentProps> = ({
  title,
  children,
  scrollable = false,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <BottomSheetScrollView
      style={styles.container}
      scrollEnabled={scrollable ?? false}>
      <DrawerHeader title={title} />
      <View style={styles.content}>{children}</View>
    </BottomSheetScrollView>
  );
};

export default DrawerContent;

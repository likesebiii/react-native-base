import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { useBaseBackPress, useBaseAspect } from '@hooks';
import { FunctionalComponent } from '@types';
import BottomSheetBaseBackground from 'components/bottom-sheet/bottom-sheet-base-background/BottomSheetBaseBackground';
import BottomSheetBaseHandle from 'components/bottom-sheet/bottom-sheet-base-handle/BottomSheetBaseHandle';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import DrawerContent from './components/drawer-content/DrawerContent';
import { aspectStyle } from './aspect';

type DrawerProps = {
  title?: string;
  bottomSheetProps?: Partial<BottomSheetProps>;
  onClose?: () => void;
  scrollable?: boolean;
  snapPoints?:
    | Array<string | number>
    | SharedValue<Array<string | number>>
    | Readonly<(string | number)[] | SharedValue<(string | number)[]>>
    | boolean;
};

const Drawer: FunctionalComponent<DrawerProps> = ({
  title,
  bottomSheetProps,
  onClose,
  children,
  scrollable = false,
  snapPoints = false,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const animatedIndex = useSharedValue(0);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const startClose = () => {
    bottomSheetRef.current?.close();
  };

  const onChange = (index: number) => {
    animatedIndex.value = index;
  };

  const backgroundOpacityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedIndex.value === -1 ? 0 : 0.5),
    };
  });

  const handleComponent = React.useCallback(
    (props: any) => (
      <BottomSheetBaseBackground
        {...props}
        onPress={startClose}
        animatedStyle={backgroundOpacityAnimatedStyle}
      />
    ),
    [],
  );

  const backdropComponent = React.useCallback(
    (props: any) => <BottomSheetBaseHandle {...props} />,
    [],
  );

  useBaseBackPress(startClose, []);

  const onDrawerClose = () => {
    setTimeout(() => {
      onClose?.();
    }, 50);
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        enableDynamicSizing={true}
        ref={bottomSheetRef}
        snapPoints={
          typeof snapPoints === 'boolean'
            ? snapPoints === true
              ? ['80%']
              : snapPoints === false
              ? undefined
              : snapPoints
            : snapPoints
        }
        enablePanDownToClose
        backdropComponent={handleComponent}
        handleComponent={backdropComponent}
        onClose={onDrawerClose}
        onChange={onChange}
        keyboardBlurBehavior={'restore'}
        {...bottomSheetProps}
        style={[
          styles.bottomSheet,
          StyleSheet.flatten(bottomSheetProps?.style),
        ]}>
        <DrawerContent title={title} scrollable={scrollable}>
          {children}
        </DrawerContent>
      </BottomSheet>
    </View>
  );
};

export default Drawer;

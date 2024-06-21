import { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export const componentWithStyle = (
  component: ReactElement | undefined | null,
  style: StyleProp<ViewStyle>,
) => {
  return component ? <View style={style}>{component}</View> : null;
};

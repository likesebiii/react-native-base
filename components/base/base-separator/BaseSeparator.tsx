import { useBaseAspect } from '@hooks';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { aspectStyle } from './style';

type BaseSeparatorProps = {
  style?: StyleProp<ViewStyle>;
};

const BaseSeparator: React.FC<BaseSeparatorProps> = ({ style }) => {
  const { styles } = useBaseAspect(aspectStyle);

  return <View style={[styles.separator, style]} />;
};

export default BaseSeparator;

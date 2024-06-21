import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';

type SplashPageProps = {};

const SplashPage: React.FC<SplashPageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return <View style={styles.container} />;
};

export default SplashPage;

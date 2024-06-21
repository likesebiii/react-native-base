import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';

export type DrawerHeaderProps = {
  title?: string;
};

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ title }) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <View
      style={[
        styles.container,
        title ? styles.separator : undefined,
        styles.padding,
      ]}>
      {title ? (
        <BaseText type={'texturina-24-semi-bold'} style={styles.text}>
          {title}
        </BaseText>
      ) : undefined}
    </View>
  );
};

export default DrawerHeader;

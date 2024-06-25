import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';

type SettingsSectionTitleProps = {
  title?: string;
  margin?: boolean;
};

const SettingsSectionTitle: React.FC<SettingsSectionTitleProps> = ({
  title,
  margin = false,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <BaseText
      type={'jockey-20'}
      style={[styles.title, margin ? styles.margin : {}]}>
      {title}
    </BaseText>
  );
};

export default SettingsSectionTitle;

import React from 'react';
import { aspectStyle } from './aspect';
import { useBaseBrowser, useBaseAspect } from '@hooks';
import { BaseText } from 'components/base/base-text/BaseText';

type BaseTermsOfServiceProps = {};

const BaseTermsOfService: React.FC<BaseTermsOfServiceProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { openLink } = useBaseBrowser();

  const onTOSLinkPress = openLink.bind(
    null,
    'https://docs.google.com/document/d/1DT_ukMdTWaIIepzN1Y9P6S8JlCaiEo-oQFiwg7IrGpA/edit?usp=sharing',
  );

  const onPrivacyLinkPress = openLink.bind(
    null,
    'https://docs.google.com/document/d/1uQfWwshDXSv11vtBHwgU7c4H0DGDLPy_ZxCA8ZRWmJk/edit',
  );

  return (
    <BaseText style={styles.text}>
      <BaseText style={styles.underline} onPress={onTOSLinkPress}>
        {'Terms of Service'}
      </BaseText>
      {' & '}
      <BaseText style={styles.underline} onPress={onPrivacyLinkPress}>
        {'Privacy Policy'}
      </BaseText>
    </BaseText>
  );
};

export default BaseTermsOfService;

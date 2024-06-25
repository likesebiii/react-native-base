import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import PaywallContent from './components/paywall-content/PaywallContent';
import { PaywallLocationType } from '@types';

type PaywallPageProps = {
  location?: PaywallLocationType;
};

const PaywallPage: React.FC<PaywallPageProps & PageProps> = ({ location }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const onClose = () => {
    NAVIGATION_CONTROLLER.close();
  };

  return (
    <Page style={styles.container}>
      <PaywallContent onClose={onClose} location={location} />
    </Page>
  );
};

export default PaywallPage;

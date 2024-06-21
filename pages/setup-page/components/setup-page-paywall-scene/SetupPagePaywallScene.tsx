import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import PaywallContent from 'pages/paywall-page/components/paywall-content/PaywallContent';
import { Analytics } from '@services';

interface SetupPagePaywallSceneProps {
  onContinue?: () => void;
}

const SetupPagePaywallScene: React.FC<SetupPagePaywallSceneProps> = ({
  onContinue,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  React.useEffect(() => {
    Analytics.log('setupStep', { type: 'paywall' }, ['amplitude']);
  }, []);

  return (
    <View style={styles.container}>
      <PaywallContent onClose={onContinue} />
    </View>
  );
};

export default SetupPagePaywallScene;

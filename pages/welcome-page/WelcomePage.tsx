import React from 'react';
import { View } from 'react-native';
import {
  useRootAnalytics,
  useBaseRemoveNotifications,
  useBaseAspect,
} from '@hooks';
import { aspectStyle } from './aspect';
import WelcomePageContent from './components/welcome-page-content/WelcomePageContent';
import SplashScreen from 'react-native-splash-screen';
import { Analytics } from '@services';
import RootRequestTrackingListener from 'pages/root-page/components/root-request-tracking-listener/RootRequestTrackingListener';
import RootScreenHeightListener from 'pages/root-page/components/root-screen-height-listener/RootScreenHeightListener';

type WelcomePageProps = {};

const WelcomePage: React.FC<WelcomePageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  // Used for analytics
  useRootAnalytics();

  // Remove the badge on ios when entering the app
  useBaseRemoveNotifications();

  // Remove splash screen
  React.useEffect(SplashScreen.hide);

  // Analytics
  React.useEffect(() => {
    Analytics.log('openWelcome', {}, ['firebase', 'amplitude'], 'forceUpload');
  }, []);

  return (
    <>
      {/* Used to automatically measure the screen height */}
      <RootScreenHeightListener />
      {/* Request tracking listener */}
      <RootRequestTrackingListener />
      <View style={styles.container}>
        <WelcomePageContent />
      </View>
    </>
  );
};

export default WelcomePage;

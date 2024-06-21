import React from 'react';
import {
  useRootAnalytics,
  useBaseRemoveNotifications,
  useRootShowSetup,
  useBaseAspect,
} from '@hooks';
import { aspectStyle } from './aspect';
import { Analytics, Redux, Vortex } from '@services';
import SplashScreen from 'react-native-splash-screen';
import RootLivesListener from './components/root-lives-listener/RootLivesListener';
import RootStreakListener from './components/root-streak-listener/RootStreakListener';
import RootProListener from './components/root-pro-listener/RootProListener';
import RootDailyNotificationsListener from './components/root-daily-notifications-listener/RootDailyNotificationsListener';
import RootPageContent from './components/root-page-content/RootPageContent';
import RootNSIListener from './components/root-nsi-listener/RootNSIListener';
import RootRequestTrackingListener from './components/root-request-tracking-listener/RootRequestTrackingListener';
import RootScreenHeightListener from './components/root-screen-height-listener/RootScreenHeightListener';
import RootAnalyticsListener from './components/root-analytics-listener/RootAnalyticsListener';

interface RootPageProps {}

const DEFAULT_TIMEOUT = 1000;

const RootPage: React.FC<RootPageProps> = ({}) => {
  const {} = useBaseAspect(aspectStyle);

  // Used for analytics
  useRootAnalytics();

  // Used to show the onboarding page
  useRootShowSetup();

  // Remove the badge on ios when entering the app
  useBaseRemoveNotifications();

  // Send open home events
  React.useEffect(() => {
    setTimeout(() => {
      const sessions = Redux.getState().current.user?.sessions;
      const isNSI = Vortex.select('user-vortex', 'selectIsNSI');

      if (isNSI) {
        Analytics.log('openHomeNSIUser', {}, ['firebase', 'amplitude']);
      } else if (sessions === 1) {
        Analytics.log('openHomeNewUser', {}, ['firebase', 'amplitude']);
      } else {
        Analytics.log('openHome', {}, ['firebase', 'amplitude']);
      }
    }, DEFAULT_TIMEOUT);
  }, []);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      {/* Analytics listener */}
      <RootAnalyticsListener />
      {/* Used to automatically measure the height */}
      <RootScreenHeightListener />
      {/* Used to automatically generate lives */}
      <RootLivesListener />
      {/* Used to avoid any NSI possible error */}
      <RootNSIListener />
      {/* Used to automatically reset streak */}
      <RootStreakListener />
      {/* Used to automatically change subscription */}
      <RootProListener />
      {/* Used to listen for triggering daily notifications */}
      <RootDailyNotificationsListener />
      {/* Request tracking listener */}
      <RootRequestTrackingListener />
      {/* Root content */}
      <RootPageContent />
    </>
  );
};

export default RootPage;

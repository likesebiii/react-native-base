import * as firebaseAnalytics from '@react-native-firebase/analytics';
import { Amplitude, Identify } from '@amplitude/react-native';
import { version } from '../../../package.json';
import React from 'react';
import {
  Application,
  FirebaseNotifications,
  useSelectRedux,
  Vortex,
} from '@services';

const useRootAnalytics = () => {
  const {
    id: userId,
    email,
    username = '',
  } = useSelectRedux('current', 'currentUser', ['id', 'email', 'username']);

  const triggered = React.useRef(false);

  const setFirebase = React.useCallback(() => {
    const userDetails = {
      email: email ?? '',
      userId: `${userId}`,
      username: username,
    };

    if (userId) {
      firebaseAnalytics.firebase.analytics().setUserId(userId);
    }

    firebaseAnalytics.firebase.analytics().setUserProperties(userDetails);
  }, [userId]);

  const setAmplitude = async () => {
    const identify = new Identify();

    const notificationsEnabled =
      await FirebaseNotifications.notificationsEnabled();

    const applicationBuildNumber = Application.getCurrentBuildNumber();
    const subscription = Vortex.select('user-vortex', 'selectUserSubscription');

    identify.set('application_version', version);
    identify.set('application_build_number', applicationBuildNumber);

    identify.set('email', email);
    identify.set('user_id', userId);
    identify.set('username', username);
    identify.set('subscription', subscription ? 'pro' : 'free');
    identify.set('notifications_enabled', `${notificationsEnabled ?? false}`);

    Amplitude.getInstance().identify(identify);
  };

  const setAnalytics = () => {
    if (userId) {
      triggered.current = true;

      setAmplitude();
      setFirebase();
    }
  };

  React.useEffect(() => {
    if (triggered.current === true || userId === undefined) {
      return;
    }

    setAnalytics();
  }, [userId]);
};

export default useRootAnalytics;

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { NativeModules, Platform } from 'react-native';

const { Notifications: AndroidNotifications } = NativeModules;

export const Notifications = {
  cancel: () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    } else if (Platform.OS === 'android') {
      try {
        AndroidNotifications?.cancelAll();
      } catch (err) {
        console.log('[remove notifications]', err);
      }
    }
  },
} as const;

export default Notifications;

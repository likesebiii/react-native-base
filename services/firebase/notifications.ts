import Firebase from '@react-native-firebase/app';
import Permissions from 'react-native-permissions';
import '@react-native-firebase/messaging';
import { Analytics } from 'services/analytics';
import { Platform } from 'react-native';

const FirebaseNotifications = {
  init: () => {
    Firebase.messaging().setBackgroundMessageHandler(() => {
      return Promise.resolve();
    });
  },
  notificationsEnabled: async () => {
    if (Platform.OS === 'ios') {
      const permissions = await Firebase.messaging().hasPermission();

      return permissions === Firebase.messaging.AuthorizationStatus.AUTHORIZED;
    } else {
      const permissions = await Permissions.checkNotifications();

      return permissions.status === Permissions.RESULTS.GRANTED;
    }
  },
  requestPermissions: async ({ location }: { location?: string }) => {
    try {
      if (Platform.OS === 'ios') {
        const authorizationStatus =
          await Firebase.messaging().requestPermission();

        Analytics.log(
          'requestNotificationsPermission',
          {
            notifications:
              authorizationStatus ===
              Firebase.messaging.AuthorizationStatus.AUTHORIZED,
            location,
            device: 'ios',
          },
          ['amplitude'],
        );
      } else {
        const permission = await Permissions.requestNotifications([
          'alert',
          'badge',
          'sound',
        ]);

        Analytics.log(
          'requestNotificationsPermission',
          {
            notifications: permission.status === 'granted',
            location: location,
            device: 'android',
          },
          ['amplitude'],
        );
      }
    } catch {}
  },
} as const;

export default FirebaseNotifications;

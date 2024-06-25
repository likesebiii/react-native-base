import { AnalyticsType } from '@types';
import * as firebaseAnalytics from '@react-native-firebase/analytics';
import { Amplitude as AmplitudeReactNative } from '@amplitude/react-native';
import * as Sentry from '@sentry/react-native';
import Events from './events';
import Amplitude from './amplitude';
import Crashlytics from 'services/firebase/crashlytics';
import { EMPTY_FUNCTION } from '@utils';

type EventsKeyType = keyof typeof Events;
type EventsPropsType<K extends EventsKeyType> = Partial<
  (typeof Events)[K]['params']
>;

const Analytics = {
  log: <T extends EventsKeyType>(
    key: T,
    params?: EventsPropsType<T>,
    platforms?: AnalyticsType[],
    onFinish?: (() => void) | 'forceUpload',
  ) => {
    const props = params ?? {};
    const plat = platforms ?? ['amplitude'];
    const name = Events[key].name;
    const onFinal =
      onFinish === undefined
        ? EMPTY_FUNCTION
        : onFinish === 'forceUpload'
        ? Amplitude.forceUpload
        : onFinish;

    plat.forEach((platform) => {
      switch (platform) {
        case 'amplitude': {
          AmplitudeReactNative.getInstance()
            .logEvent(name, props)
            .finally(onFinal);
          break;
        }
        case 'firebase': {
          firebaseAnalytics.firebase
            .analytics()
            .logEvent(name.replaceAll(' ', '_').toLowerCase(), props)
            .finally(onFinal);
          break;
        }
        default:
          break;
      }
    });
  },
  configure: ({
    id,
    email,
    username,
    platforms,
  }: {
    id: string;
    email: string;
    username: string;
    platforms: ('amplitude' | 'sentry' | 'crashlytics')[];
  }) => {
    platforms.forEach((platform) => {
      switch (platform) {
        case 'amplitude':
          Amplitude.setUserId(id);
          break;
        case 'sentry':
          Sentry.configureScope((scope) => {
            scope.setUser({
              id,
              email,
              username,
            });
          });
          break;
        case 'crashlytics':
          Crashlytics.set(id, username, email);
          break;
        default:
          break;
      }
    });
  },
} as const;

export default Analytics;

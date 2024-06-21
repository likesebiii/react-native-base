import * as SentryModule from '@sentry/react-native';
import { routingInstrumentation } from 'services/navigation';

/**
 * Source: https://docs.sentry.io/platforms/react-native/performance/instrumentation/react-native-navigation/
 */
export const Sentry = {
  init: () => {
    if (!(global as any)?.__DEV__) {
      SentryModule.init({
        dsn: 'https://55a05b026c92c001781a330e5fa1c45f@o4506576115138560.ingest.sentry.io/4506576117956608',
        tracesSampleRate: 0.1,
        integrations: [
          new SentryModule.ReactNativeTracing({
            // Pass instrumentation to be used as `routingInstrumentation`
            routingInstrumentation:
              new SentryModule.ReactNativeNavigationInstrumentation(
                routingInstrumentation,
              ),
          }),
        ],
      });
    }
  },
} as const;

export default Sentry;

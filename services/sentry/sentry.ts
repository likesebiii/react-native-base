import * as SentryModule from "@sentry/react-native";
import { routingInstrumentation } from "services/navigation";

/**
 * Source: https://docs.sentry.io/platforms/react-native/performance/instrumentation/react-native-navigation/
 */
export const Sentry = {
  init: () => {
    if (!(global as any)?.__DEV__) {
      SentryModule.init({
        dsn: "[]",
        tracesSampleRate: 0.1,
        integrations: [
          new SentryModule.ReactNativeTracing({
            // Pass instrumentation to be used as `routingInstrumentation`
            routingInstrumentation:
              new SentryModule.ReactNativeNavigationInstrumentation(
                routingInstrumentation
              ),
          }),
        ],
      });
    }
  },
} as const;

export default Sentry;

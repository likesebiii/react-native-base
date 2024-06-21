import { Amplitude as AmplitudeReactNative } from '@amplitude/react-native';

const Amplitude = {
  init: () => {
    const key = __DEV__
      ? 'a68fc348d56e2f4dec5a8bdb14ecf796' ?? '137df4b450e0a235da324bbff82d41e4'
      : '137df4b450e0a235da324bbff82d41e4';
    const amplitudeInstance = AmplitudeReactNative.getInstance();

    if (key) {
      amplitudeInstance.init(key);
      amplitudeInstance.trackingSessionEvents(true);
      amplitudeInstance.enableLogging(true);
    }
  },
  setUserId: (userId?: string) => {
    if (userId) {
      AmplitudeReactNative.getInstance().setUserId(userId);
    }
  },
  forceUpload: () => {
    AmplitudeReactNative.getInstance().uploadEvents();
  },
} as const;

export default Amplitude;

import crashlytics from '@react-native-firebase/crashlytics';

const Crashlytics = {
  set: (userId: string, name: string, email: string) => {
    crashlytics().setUserId(userId);
    crashlytics().setAttributes({ username: name, email: email });
  },
} as const;

export default Crashlytics;

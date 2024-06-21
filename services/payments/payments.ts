import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

const Payments = {
  init: () => {
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: 'appl_YCAoLmIRkDSnytfSjwPQOSawgfn' });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: 'goog_BvtWEjtewKDXnijdLhNNWdxfBNM' });
    }
  },
} as const;

export default Payments;

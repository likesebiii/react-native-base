import { Platform } from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from 'react-native-haptic-feedback';

const VibrationsHelper: { config: HapticOptions } = {
  config: {
    ignoreAndroidSystemSettings: true,
  },
};

export const Vibrations = {
  on: true,
  trigger: (type: 'light' | 'selection' | 'success' | 'error' | 'long') => {
    if (Vibrations.on === false) {
      return;
    }

    const vibration: { type: HapticFeedbackTypes } = {
      type: HapticFeedbackTypes.impactLight,
    };

    switch (type) {
      case 'selection':
        if (Platform.OS === 'ios') {
          vibration.type = HapticFeedbackTypes.impactLight;
        }
        break;
      case 'success':
        vibration.type = HapticFeedbackTypes.notificationSuccess;
        break;
      case 'long':
        vibration.type = HapticFeedbackTypes.longPress;
        break;
      case 'error':
        vibration.type = HapticFeedbackTypes.notificationError;
        break;
      case 'light':
      default:
        break;
    }

    ReactNativeHapticFeedback.trigger(vibration.type, VibrationsHelper.config);
  },
};

import ErrorToast from 'components/toasts/error-toast/ErrorToast';
import SuccessToast from 'components/toasts/success-toast/SuccessToast';
import { ToastProps } from 'react-native-toast-message';

const toastsConfig: Record<string, React.FC<ToastProps>> = {
  success: (props) => <SuccessToast {...props} />,
  error: (props) => <ErrorToast {...props} />,
};

export default toastsConfig;

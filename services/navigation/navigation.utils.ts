import { PUSH_NOTIFICATIONS_CONTROLLER } from 'utils/notifications';
import { NAVIGATION_CONTROLLER } from './navigation.controller';
import { Redux, Vortex } from '@services';

export const onLogout = () => {
  Vortex.dispatch('user-vortex', 'resetUserObjectOnLogout')();
  // Cancel all notification
  PUSH_NOTIFICATIONS_CONTROLLER.cancelAllNotifications();
  // Dispatch the logout action
  Redux.dispatchThunk('current', 'logoutThunk');
  // Set welcome page
  NAVIGATION_CONTROLLER.setRoot('fk.WelcomePage');
};

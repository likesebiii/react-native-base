import { PUSH_NOTIFICATIONS_CONTROLLER } from 'utils/notifications';
import React from 'react';
import { Vortex } from '@services';

interface RootDailyNotificationsListenerProps {}

const DEFAULT_TIMEOUT = 100;

const RootDailyNotificationsListener: React.FC<RootDailyNotificationsListenerProps> =
  ({}) => {
    React.useEffect(() => {
      setTimeout(() => {
        const notifications =
          Vortex.getObject('user-vortex').setup.notifications;

        if (notifications !== true) {
          PUSH_NOTIFICATIONS_CONTROLLER.triggerDailyNotifications();
          Vortex.dispatch('user-vortex', 'changeSetupNotifications')(true);
        }
      }, DEFAULT_TIMEOUT);
    }, []);

    return null;
  };

export default RootDailyNotificationsListener;

import { useEffect } from 'react';
import { Notifications } from '@services';
import useBaseUpdateFromBackground from './useBaseUpdateFromBackground';

const useBaseRemoveNotifications = () => {
  useEffect(Notifications.cancel, []);

  useBaseUpdateFromBackground({
    onUpdate: Notifications.cancel,
  });
};

export default useBaseRemoveNotifications;

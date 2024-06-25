import { Analytics, useSelectRedux } from '@services';
import React from 'react';

interface RootAnalyticsListenerProps {}

const RootAnalyticsListener: React.FC<RootAnalyticsListenerProps> = ({}) => {
  const { id, email, username } = useSelectRedux('current', 'currentUser', [
    'id',
    'email',
    'username',
  ]);

  React.useEffect(() => {
    if (id !== undefined && email !== undefined && username !== undefined) {
      Analytics.configure({
        id,
        username,
        email,
        platforms: ['amplitude', 'sentry', 'crashlytics'],
      });
    }
  }, [id]);

  return null;
};

export default RootAnalyticsListener;

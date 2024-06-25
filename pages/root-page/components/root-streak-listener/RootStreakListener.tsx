import { getDateDifferenceInDaysMidnight } from '@utils';
import React from 'react';
import { useSelectVortex, Vortex } from '@services';

interface RootStreakListenerProps {}

const DEFAULT_TIMEOUT = 50;

const RootStreakListener: React.FC<RootStreakListenerProps> = ({}) => {
  const { lastDay: date } = useSelectVortex(
    'user-vortex',
    (item) => item.streak,
  );

  const hasBeenCalled = React.useRef(false);

  React.useEffect(() => {
    if (hasBeenCalled.current === false) {
      // Make sure that it doesn't interfere
      // with fast reload
      // for development purpose
      hasBeenCalled.current = true;

      setTimeout(() => {
        const dateNow = new Date(Date.now()).toISOString().slice(0, -1);

        if (date) {
          const difference = Math.floor(
            getDateDifferenceInDaysMidnight(dateNow, date),
          );

          if (difference > 1) {
            // The streak should be reset
            Vortex.dispatch('user-vortex', 'resetUserStreak')();
          }
        }
      }, DEFAULT_TIMEOUT);
    }
  }, []);

  return null;
};

export default RootStreakListener;

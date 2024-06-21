import {
  LIVES_LIMIT,
  LIVES_TIMEOUT,
  getDateDifferenceInMilliseconds,
  getDateDifferenceInSeconds,
} from '@utils';
import { PUSH_NOTIFICATIONS_CONTROLLER } from 'utils/notifications';
import React from 'react';
import { useSelectVortex, Vortex } from '@services';

interface RootLivesListenerProps {}

const DEFAULT_TIMEOUT = 100;

const RootLivesListener: React.FC<RootLivesListenerProps> = ({}) => {
  const { date, count } = useSelectVortex('user-vortex', (item) => item.lives);

  const isPro = useSelectVortex('user-vortex', 'selectUserSubscriptionType');
  const isProRef = React.useRef<'pro' | 'free'>(isPro);

  const timerRef = React.useRef<NodeJS.Timeout>();
  const countRef = React.useRef(count);
  const hasBeenCalled = React.useRef(false);

  const triggerIncrementLive = (date: string) => {
    const dateInMilliseconds =
      getDateDifferenceInMilliseconds(date) +
      LIVES_TIMEOUT[isProRef.current] * 1000;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Set the current date
      // as lives date
      if (countRef.current < LIVES_LIMIT[isProRef.current]) {
        Vortex.dispatch('user-vortex', 'addUserLives')(1, true);
        if (countRef.current + 1 < LIVES_LIMIT[isProRef.current]) {
          triggerIncrementLive(new Date(Date.now()).toISOString().slice(0, -1));
        }
      } else {
        // Change lives date
        Vortex.dispatch('user-vortex', 'changeLivesDate')();
      }
    }, dateInMilliseconds);
  };

  React.useEffect(() => {
    if (isProRef.current === 'free' && isPro === 'pro') {
      // Clear timeout as the lives are full
      // it will be triggered automatically
      clearTimeout(timerRef.current);
    }

    isProRef.current = isPro;
  }, [isPro]);

  React.useEffect(() => {
    if (hasBeenCalled.current === false) {
      // Make sure that it doesn't interfere
      // with fast reload
      // for development purpose
      hasBeenCalled.current = true;

      setTimeout(() => {
        const dateNow = new Date(Date.now()).toISOString().slice(0, -1);

        if (date) {
          const lives = Math.min(
            Math.max(0, LIVES_LIMIT[isProRef.current] - count),
            Math.floor(
              getDateDifferenceInSeconds(dateNow, date) /
                LIVES_TIMEOUT[isProRef.current],
            ),
          );

          if (lives > 0) {
            // Set the current date
            // as lives date
            Vortex.dispatch('user-vortex', 'addUserLives')(lives, true);
            if (count + lives < LIVES_LIMIT[isProRef.current]) {
              triggerIncrementLive(dateNow);
            }
          } else {
            // Trigger timer with the current date
            triggerIncrementLive(date);
          }
        } else {
          // Set the current date
          // as lives date
          Vortex.dispatch('user-vortex', 'changeLivesDate')(dateNow);
          triggerIncrementLive(dateNow);
        }
      }, DEFAULT_TIMEOUT);
    }
  }, []);

  React.useEffect(() => {
    if (
      count === LIVES_LIMIT[isProRef.current] - 1 &&
      countRef.current === LIVES_LIMIT[isProRef.current]
    ) {
      const dateNow = new Date(Date.now()).toISOString().slice(0, -1);
      // Start another timer
      // Set the current date
      Vortex.dispatch('user-vortex', 'changeLivesDate')(dateNow);
      triggerIncrementLive(dateNow);
    } else if (count > countRef.current) {
      // Maybe upgrade to pro here triggered
      PUSH_NOTIFICATIONS_CONTROLLER.cancelNotifications(['life-notification']);
    }

    countRef.current = count;
  }, [count]);

  return null;
};

export default RootLivesListener;

import { UserType } from '@types';
import { StoreStateType } from '../store/store.types';
import { createSelector } from '@reduxjs/toolkit';

const ReduxCurrentSelectors = {
  currentState: () => (state: StoreStateType) => state.current,
  currentUser: <K extends keyof UserType>(keys?: K | K[]) =>
    createSelector(
      [ReduxCurrentSelectors.currentState()],
      (current): Partial<Pick<UserType, K>> => {
        if (keys) {
          const acc = {} as Partial<Pick<UserType, K>>;

          if (typeof keys === 'object') {
            keys.forEach((key) => {
              const currentUserKey = key;

              if (keys.includes(key)) {
                acc[currentUserKey] = current?.user?.[key];
              }
            });
          } else {
            acc[keys] = current?.user?.[keys];
          }

          return acc;
        } else {
          return current?.user ? current.user : {};
        }
      },
    ),
};

export default ReduxCurrentSelectors;

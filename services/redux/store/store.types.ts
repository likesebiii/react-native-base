import { UserType } from '@types';

export type CurrentStateType = {
  user?: UserType;
};

export type StoreStateType = {
  current: CurrentStateType;
};

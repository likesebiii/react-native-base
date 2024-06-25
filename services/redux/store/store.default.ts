import { Dispatch, Reducer, UnknownAction } from '@reduxjs/toolkit';
import { StoreStateType } from './store.types';
import { Listener } from '@types';
import REDUX_STORE_CONTEXTS, {
  ReduxStoreContextType,
  ReduxStoreContextMapperType,
} from './store.utils';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { store } from './store.persistor';

type Parameters<T extends ((...args: any) => any) | any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type ReturnType<T extends ((...args: any) => any) | any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

const Redux: {
  getState: () => StoreStateType;
  subscribe: Listener;
  dispatch: Dispatch<UnknownAction>;
  select: <
    RKey extends ReduxStoreContextType,
    RSelectorKey extends keyof ReduxStoreContextMapperType[RKey]['selectors'],
    RSelector = ReduxStoreContextMapperType[RKey]['selectors'][RSelectorKey],
  >(
    key: RKey,
    selectorKey: RSelectorKey,
    ...props: Parameters<RSelector>
  ) => ReturnType<ReturnType<RSelector>>;
  dispatchThunk: <
    RKey extends ReduxStoreContextType,
    RThunkKey extends keyof ReduxStoreContextMapperType[RKey]['thunks'],
    RThunk = ReduxStoreContextMapperType[RKey]['thunks'][RThunkKey],
  >(
    key: RKey,
    thunkKey: RThunkKey,
    ...props: Parameters<RThunk>
  ) => ReturnType<ReturnType<RThunk>>;
  dispatchAction: <
    RKey extends ReduxStoreContextType,
    RActionKey extends keyof ReduxStoreContextMapperType[RKey]['actions'],
    RAction = ReduxStoreContextMapperType[RKey]['actions'][RActionKey],
  >(
    key: RKey,
    actionKey: RActionKey,
    ...props: Parameters<RAction>
  ) => ReturnType<ReturnType<RAction>>;
  replaceReducer: (
    nextReducer: Reducer<
      StoreStateType & PersistPartial,
      UnknownAction,
      StoreStateType & PersistPartial
    >,
  ) => void;
} = {
  ...store,
  getState: () => {
    return store.getState();
  },
  select: (key, selectorKey, ...props) => {
    const selector = REDUX_STORE_CONTEXTS[key]['selectors'][
      selectorKey as never
    ] as any;

    return selector?.(...props)(store.getState());
  },
  dispatchThunk: (key, thunkKey, ...props) => {
    const thunk = REDUX_STORE_CONTEXTS[key]['thunks'][thunkKey as never] as any;

    return store.dispatch(thunk?.(...props));
  },
  dispatchAction: (key, actionKey, ...props) => {
    const action = REDUX_STORE_CONTEXTS[key]['actions'][
      actionKey as never
    ] as any;

    return store.dispatch(action?.(...props));
  },
};

export default Redux;

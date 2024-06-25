import ReduxCurrentActions from '../current/current.actions';
import ReduxCurrentReducer from '../current/current.reducer';
import ReduxCurrentSelectors from '../current/current.selectors';
import ReduxCurrentThunks from '../current/current.thunks';
import ReduxCurrentUtils from '../current/current.utils';

const REDUX_STORE_CONTEXTS = {
  current: {
    reducer: ReduxCurrentReducer,
    selectors: ReduxCurrentSelectors,
    thunks: ReduxCurrentThunks,
    utils: ReduxCurrentUtils,
    actions: ReduxCurrentActions,
  },
};

export default REDUX_STORE_CONTEXTS;

export type ReduxStoreContextType = keyof typeof REDUX_STORE_CONTEXTS;
export type ReduxStoreContextMapperType = {
  [R in ReduxStoreContextType]: {
    reducer: (typeof REDUX_STORE_CONTEXTS)[R]['reducer'];
    selectors: (typeof REDUX_STORE_CONTEXTS)[R]['selectors'];
    thunks: (typeof REDUX_STORE_CONTEXTS)[R]['thunks'];
    utils: (typeof REDUX_STORE_CONTEXTS)[R]['utils'];
    actions: (typeof REDUX_STORE_CONTEXTS)[R]['actions'];
  };
};

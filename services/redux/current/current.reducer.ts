import initialState from '../store/store.initial';
import { createReducer } from '@reduxjs/toolkit';
import ReduxCurrentThunks from 'services/redux/current/current.thunks';

const getInitialState = () => Object.assign({}, initialState.current);

const ReduxCurrentReducer = createReducer(getInitialState(), (builder) => {
  builder
    .addCase(
      ReduxCurrentThunks.fetchCurrentProfileInfo.fulfilled,
      (state, action) => {
        return {
          ...state,
          user: action.payload,
        };
      },
    )
    .addCase(ReduxCurrentThunks.logoutThunk.fulfilled, (_) => {
      return { ...getInitialState() };
    })
    .addDefaultCase((state) => {
      return state;
    });
});

export default ReduxCurrentReducer;

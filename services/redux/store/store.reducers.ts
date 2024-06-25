import { combineReducers } from '@reduxjs/toolkit';
import ReduxCurrentReducer from '../current/current.reducer';

const storeReducers = combineReducers({
  current: ReduxCurrentReducer,
});

export default storeReducers;

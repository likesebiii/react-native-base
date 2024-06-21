import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storeReducers from "./store.reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "[application]",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, storeReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }),
});

const ReduxPersistor = persistStore(store);

export default ReduxPersistor;

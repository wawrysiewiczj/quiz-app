import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import messageReducer from "./message/messageSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const excludedActions = ["persist/PERSIST", "persist/REHYDRATE"];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      createStateSyncMiddleware({
        blacklist: excludedActions,
      })
    ),
});

initMessageListener(store);

export const persistor = persistStore(store);

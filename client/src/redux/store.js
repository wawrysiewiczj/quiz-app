import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import messageReducer from "./message/messageSlice";
import userquizReducer from "./userquiz/userquizSlice";
import themeReducer from "./theme/themeSlice";
import userStatsReducer from "./userStats/userStatsSlice";
import categoryReducer from "./category/categorySlice.js";
import quizResultReducer from "./quizResult/quizResultSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  userQuiz: userquizReducer,
  theme: themeReducer,
  category: categoryReducer,
  userStats: userStatsReducer,
  quizResult: quizResultReducer,
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

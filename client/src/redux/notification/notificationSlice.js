// notificationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    // Dodaj inne akcje w razie potrzeby, np. usuwanie powiadomień, oznaczanie jako przeczytane, itp.
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;

export default notificationSlice.reducer;

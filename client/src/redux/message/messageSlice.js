import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  messages: null,
};

const messageSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessageStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    sendMessageSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = false;
    },
    sendMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    receiveMessageStart: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    receiveMessageSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = false;
    },
    receiveMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  receiveMessageStart,
  receiveMessageSuccess,
  receiveMessageFailure,
} = messageSlice.actions;

export default messageSlice.reducer;

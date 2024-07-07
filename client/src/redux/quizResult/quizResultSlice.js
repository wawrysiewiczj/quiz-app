import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  quizResults: [],
};

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState,
  reducers: {
    fetchQuizResultStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchQuizResultSuccess: (state, action) => {
      state.quizResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchQuizResultFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuizResultStart,
  fetchQuizResultSuccess,
  fetchQuizResultFailure,
} = quizResultSlice.actions;

export default quizResultSlice.reducer;

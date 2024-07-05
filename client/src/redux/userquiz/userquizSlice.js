import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userQuizzes: [],
};

const userQuizSlice = createSlice({
  name: "userQuiz",
  initialState,
  reducers: {
    fetchUserQuizzesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserQuizzesSuccess: (state, action) => {
      state.userQuizzes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserQuizzesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUserQuizStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserQuizSuccess: (state, action) => {
      state.userQuizzes.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addUserQuizFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserQuizStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserQuizSuccess: (state, action) => {
      state.userQuizzes = state.userQuizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteUserQuizFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserQuizzesStart,
  fetchUserQuizzesSuccess,
  fetchUserQuizzesFailure,
  addUserQuizStart,
  addUserQuizSuccess,
  addUserQuizFailure,
  deleteUserQuizStart,
  deleteUserQuizSuccess,
  deleteUserQuizFailure,
} = userQuizSlice.actions;

export default userQuizSlice.reducer;

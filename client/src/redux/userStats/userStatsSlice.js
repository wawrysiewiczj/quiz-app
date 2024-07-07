import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userStats: [],
};

const userStatsSlice = createSlice({
  name: "userStats",
  initialState,
  reducers: {
    fetchUserStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserStatsSuccess: (state, action) => {
      state.userStats = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserStatsStart,
  fetchUserStatsSuccess,
  fetchUserStatsFailure,
} = userStatsSlice.actions;

export default userStatsSlice.reducer;

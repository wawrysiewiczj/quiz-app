import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategorySuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;

// Async thunk action creator
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    const res = await fetch("/api/categories/get");
    if (!res.ok) {
      throw new Error(`Error fetching categories: ${res.statusText}`);
    }
    const data = await res.json();
    dispatch(fetchCategorySuccess(data));
  } catch (error) {
    dispatch(fetchCategoryFailure(error.message));
    console.error("Failed to fetch categories:", error);
  }
};

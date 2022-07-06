import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";
import { getFoodCategoriesApi } from "./categoriesApi";

export type categoryType = {
  id: string;
  name: string;
  imgURL: string | ArrayBuffer | null | undefined;
};

interface state {
  categories: categoryType[];
  lastUpdateCategories: number;
}

const initialState: state = {
  categories: [],
  lastUpdateCategories: 0,
};

export const getFoodCategories = createAsyncThunk(
  "foods/getFoodCategories",
  async (
    { page, lastUpdate }: { page: number; lastUpdate: number },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const sLastUpdate = state.categories.lastUpdateCategories;
    if (
      lastUpdate === 0 ||
      !lastUpdate ||
      !sLastUpdate ||
      sLastUpdate < lastUpdate
    ) {
      const res = await getFoodCategoriesApi(page, lastUpdate);
      return res;
    } else {
      return null;
    }
  }
);

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFoodCategories.fulfilled, (state, action: any) => {
      if (!action.payload) return;
      state.lastUpdateCategories = action.payload?.lastUpdate || 0;
      state.categories = action.payload?.data || [];
    });
  },
});

export const selectCategories = (state: RootState) =>
  state.categories.categories;

export default slice.reducer;
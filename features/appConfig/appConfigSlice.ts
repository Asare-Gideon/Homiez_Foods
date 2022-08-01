import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";

interface state {
  appVersion: string;
  isFirstVisit: boolean;
}

const initialState: state = {
  appVersion: "1.0.0",
  isFirstVisit: true,
};

const slice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload;
    },
    setIsFirstVisit: (state, action: PayloadAction<boolean>) => {
      state.isFirstVisit = action.payload;
    },
  },
});

export const { setAppVersion, setIsFirstVisit } = slice.actions;

export const selectAppVersion = (state: RootState) =>
  state.appConfig.appVersion;
export const selectIsFirstVisit = (state: RootState) =>
  state.appConfig.isFirstVisit;

export default slice.reducer;

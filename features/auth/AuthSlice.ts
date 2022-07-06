import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";

interface state {
  expoToken: string | undefined;
}

const initialState: state = {
  expoToken: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setExpoToken: (state, action: PayloadAction<string | undefined>) => {
      state.expoToken = action.payload;
    },
  },
});

export const { setExpoToken } = slice.actions;

export const selectExpoToken = (state: RootState) => state.auth.expoToken;

export default slice.reducer;

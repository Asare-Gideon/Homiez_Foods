import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";

export type agentType = {
  uid: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  refCode: string;
  email: string;
  sales?: number;
  profit?: number;
  orders?: number;
  withdrawn?: number;
  withdrawals?: {
    amount: number;
    time: {
      seconds: number;
      nanoseconds: number;
    };
  }[];
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

interface state {
  expoToken: string | undefined;
  agent: agentType | null;
}

const initialState: state = {
  expoToken: "",
  agent: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setExpoToken: (state, action: PayloadAction<string | undefined>) => {
      state.expoToken = action.payload;
    },
    setAgent: (state, action: PayloadAction<agentType>) => {
      state.agent = action.payload;
    },
    cleanAgent: (state) => {
      state.agent = null;
    },
  },
});

export const { setExpoToken, setAgent } = slice.actions;

export const selectExpoToken = (state: RootState) => state.auth.expoToken;

export const selectAgent = (state: RootState) => state.auth.agent;

export default slice.reducer;

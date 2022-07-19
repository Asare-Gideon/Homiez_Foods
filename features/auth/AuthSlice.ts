import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";
import { userType } from "../../hooks/useFirebaseAuth";

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
  references?: number;
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
  userData: userType | null;
}

const initialState: state = {
  expoToken: "",
  agent: null,
  userData: null,
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
    setUserData: (state, action: PayloadAction<userType | null>) => {
      state.userData = action.payload;
    },
    cleanAgent: (state) => {
      state.agent = null;
    },
  },
});

export const { setExpoToken, setAgent, setUserData } = slice.actions;

export const selectExpoToken = (state: RootState) => state.auth.expoToken;

export const selectUserData = (state: RootState) => state.auth.userData;

export const selectAgent = (state: RootState) => state.auth.agent;

export default slice.reducer;

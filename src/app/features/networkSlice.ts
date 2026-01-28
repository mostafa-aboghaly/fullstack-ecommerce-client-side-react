import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  isOnline: boolean;
} = {
  isOnline: true,
};
const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkMode: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});
export const { networkMode } = networkSlice.actions;
export const networkSelector = ({ network }: RootState) => network;
export default networkSlice.reducer;

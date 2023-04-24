import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IStatus } from "../../utils/interfaces";
import { RootState } from "../store";

interface IInitial {
  status: IStatus;
}

const initialState: IInitial = {
  status: {
    isError: false,
    isFetching: true,
    isSuccess: false,
  },
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<IStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = statusSlice.actions;
export const getStatus = (state: RootState) => state.status.status;
export const statusReducer = statusSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IData, IDataset, IUser } from "../../utils/interfaces";
import { RootState } from "../store";

interface IInitial {
  datasets: IDataset[][];
  users: IUser[][];
}

const initialState: IInitial = {
  datasets: [],
  users: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<IInitial>) => {
      state.datasets = action.payload.datasets;
      state.users = action.payload.users;
    },
    setDatasets: (state, action: PayloadAction<IDataset[][]>) => {
      state.datasets = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUser[][]>) => {
      state.users = action.payload;
    },
  },
});

export const { setAll, setDatasets, setUsers } = dataSlice.actions;
export const getData = (state: RootState) => state.data;
export const dataReducer = dataSlice.reducer;

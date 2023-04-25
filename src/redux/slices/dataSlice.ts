import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IData, IDataset, IUser } from "../../utils/interfaces";
import { RootState } from "../store";

interface IInitial {
  data: {
    datasets: IDataset[][];
    users: IUser[][];
  };
  currentDataIndex?: number;
}

const initialState: IInitial = {
  data: {
    datasets: [],
    users: [],
  },
  currentDataIndex: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDatasets: (state, action: PayloadAction<IDataset[][]>) => {
      state.data.datasets = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUser[][]>) => {
      state.data.users = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentDataIndex = action.payload;
    },
  },
});

export const { setData, setDatasets, setUsers, setCurrentIndex } =
  dataSlice.actions;
export const getData = (state: RootState) => state.data.data;
export const getCurrentIndex = (state: RootState) =>
  state.data.currentDataIndex;
export const dataReducer = dataSlice.reducer;

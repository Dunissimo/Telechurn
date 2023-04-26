import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInitial {
  colors: string[];
}

const initialState: IInitial = {
  colors: [],
};

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload;
    },
  },
});

export const colorsReducer = colorsSlice.reducer;
export const { setColors } = colorsSlice.actions;
export const getColors = (state: RootState) => state.colors.colors;

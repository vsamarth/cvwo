import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import {Filter} from './types'

const initialState = Filter.All;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Filter>) => {
      return action.payload
    },
  },
});

export const selectFilter = (state: RootState) => state.filter

export const {change: changeFilter} = filterSlice.actions;
export default  filterSlice.reducer
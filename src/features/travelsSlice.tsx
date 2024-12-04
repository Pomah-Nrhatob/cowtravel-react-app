import { createSlice, current } from "@reduxjs/toolkit";
import { travelApi } from "../app/services/travelApi";
import { RootState } from "../app/store";
import { Travel } from "../app/types";

const initialState: Travel[] = [];

const sliceTravels = createSlice({
  name: "travels",
  initialState,
  reducers: {
    deleteTravelReducer: (state, action) => {
      const travels = current(state).filter(
        (el) => el.id !== action.payload.id
      );
      return travels;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      travelApi.endpoints.getTravels.matchFulfilled,
      (state, action) => {
        return [...action.payload];
      }
    );
  },
});

export const { deleteTravelReducer } = sliceTravels.actions;
export default sliceTravels.reducer;
export const selectTravels = (state: RootState) => state.travels;

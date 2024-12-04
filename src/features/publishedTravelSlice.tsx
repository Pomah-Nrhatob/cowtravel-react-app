import { createSlice } from "@reduxjs/toolkit";
import { publishedTravelApi } from "../app/services/publishedTravelApi";
import { RootState } from "../app/store";

const initialState = {
  count: 0,
  rows: [],
};

const publishedTravelSlice = createSlice({
  name: "publishedTravels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      publishedTravelApi.endpoints.getPublishedTravels.matchFulfilled,
      (state, action) => {
        return action.payload;
      }
    );
  },
});

export default publishedTravelSlice.reducer;
export const selectPublishedTravels = (state: RootState) =>
  state.publishedTravels;

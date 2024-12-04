import { createSlice } from "@reduxjs/toolkit";
import { travelApi } from "../app/services/travelApi";
import { RootState } from "../app/store";
import { Travel, SingleTravel, SingleDate } from "../app/types";

const initialState: Travel = {
  id: null,
  title: null,
  countries: null,
  createdAt: null,
  updatedAt: null,
  userId: null,
  dateTravel: null,
  isPublished: false,
  image: null,
};

const sliceTravelInfo = createSlice({
  name: "travelInfo",
  initialState,
  reducers: {
    resetTravelInfo: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      travelApi.endpoints.getOneTravel.matchFulfilled,
      (state, action) => {
        let countriesParse;
        let dateParse;
        if (action.payload.dateTravel) {
          dateParse = action.payload.dateTravel.map((el) => {
            return JSON.parse(el);
          });
        } else {
          return;
        }
        if (action.payload.countries) {
          countriesParse = action.payload.countries.map((el) => {
            return JSON.parse(el);
          });
        } else {
          return;
        }
        return {
          ...action.payload,
          countries: countriesParse,
          dateTravel: dateParse,
        };
      }
    );
  },
});

export const { resetTravelInfo } = sliceTravelInfo.actions;
export default sliceTravelInfo.reducer;
export const selectTravelInfo = (state: RootState) => state.travelInfo;

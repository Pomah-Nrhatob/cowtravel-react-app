import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/api";
import user from "../features/userSlice";
import travels from "../features/travelsSlice";
import chapters from "../features/chaptersSlice";
import travelInfo from "../features/oneTravelInfoSlice";
import publishedTravels from "../features/publishedTravelSlice";
import articles from "../features/articleSlice";
import { listenerMiddleware } from "../middleware/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user,
    travels,
    travelInfo,
    chapters,
    publishedTravels,
    articles,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware);
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

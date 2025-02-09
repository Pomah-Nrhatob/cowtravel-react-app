import { createSlice, current } from "@reduxjs/toolkit";
import { User } from "../app/types";
import { userApi } from "../app/services/usersApi";
import { RootState } from "../app/store";

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,

    resetUser: (state) => {
      state.user = null;
    },

    likeArticleReducer: (state, action) => {
      state.current?.isLikeArticles.push(action.payload);
    },

    disLikeArticleReducer: (state, action) => {
      if (state.current) {
        return {
          ...state,
          current: {
            ...state.current,
            isLikeArticles: [
              ...state.current.isLikeArticles.filter(
                (p) => p !== action.payload
              ),
            ],
          },
        };
      }
    },

    addFavoriteArticleReducer: (state, action) => {
      state.current?.favoriteArticles.push(action.payload);
    },

    deleteFavoriteArticleReducer: (state, action) => {
      if (state.current) {
        return {
          ...state,
          current: {
            ...state.current,
            favoriteArticles: [
              ...state.current.favoriteArticles.filter(
                (p) => p !== action.payload
              ),
            ],
          },
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.current = action.payload;
      })
      .addMatcher(userApi.endpoints.refresh.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.current = action.payload.user;
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state, action) => {
        state.current = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      });
  },
});

export const {
  logout,
  resetUser,
  likeArticleReducer,
  disLikeArticleReducer,
  addFavoriteArticleReducer,
  deleteFavoriteArticleReducer,
} = slice.actions;
export default slice.reducer;

export const selectisAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export const selectCurrent = (state: RootState) => state.user.current;

export const selectUser = (state: RootState) => state.user.user;

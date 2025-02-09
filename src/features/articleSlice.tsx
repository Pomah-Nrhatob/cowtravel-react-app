import { createSlice } from "@reduxjs/toolkit";
import { publishApi } from "../app/services/publishApi";
import { ArticleChapter, ArticleTravel } from "../app/types";
import { RootState } from "../app/store";
import { Chapter } from "../components/articleContainer";

type InitialState = {
  publishedTravel: ArticleTravel;
  publishedChapters: Chapter[];
};

const initialState: InitialState = {
  publishedTravel: {
    id: null,
    title: null,
    countries: null,
    dateTravel: null,
    authorId: null,
    travelId: null,
    createdAt: null,
    updateAt: null,
    userName: null,
    imagePath: null,
    isFavoriteCount: null,
    rating: null,
    viewCount: null,
  },
  publishedChapters: [],
};

const sliceArticle = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      publishApi.endpoints.getPublishedArticle.matchFulfilled,
      (state, action) => {
        return action.payload;
      }
    );
  },
});

export default sliceArticle.reducer;
export const selectArticleInfo = (state: RootState) => state.articles;

import { createSlice } from "@reduxjs/toolkit";
import { Chapter } from "../app/types";
import { chapterApi } from "../app/services/chapterApi";
import { RootState } from "../app/store";
import { imageApi } from "../app/services/imageApi";

const initialState: Chapter[] = [];

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    addNewChapterReducer: (state, action) => {
      return [
        ...state,
        {
          title: "",
          content: "<p></p>",
          id: "",
          createdAt: null,
          updatedAt: null,
          travelId: "",
          images: [],
        },
      ];
    },
    addChapterWithId: (state, action) => {
      return [...state, action.payload];
    },
    resetChaptersList: (state, action) => {
      return [];
    },
    deleteChapterReducer: (state, action) => {
      return state.filter((el, index) => index !== action.payload);
    },
    deleteChapterWithId: (state, action) => {
      return state.filter((el) => el.id !== action.payload);
    },
    deleteImageReducer: (state, action) => {
      [...state].forEach((el) => {
        if (el.id == action.payload.chapterId) {
          el.images = el.images?.filter(
            (item) => item.id !== action.payload.id
          );
        }
      });
      [...state];
    },
    addImagesReducer: (state, action) => {
      state.forEach((chapter) => {
        if (chapter.id == action.payload[0].chapterId) {
          return action.payload.forEach((el) => chapter.images?.push(el));
        }
      });
      [...state];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chapterApi.endpoints.getChapters.matchFulfilled,
      (state, action) => {
        return [...action.payload];
      }
    );
  },
});

export const {
  addNewChapterReducer,
  resetChaptersList,
  deleteChapterReducer,
  deleteChapterWithId,
  addChapterWithId,
  addImagesReducer,
  deleteImageReducer,
} = chaptersSlice.actions;
export default chaptersSlice.reducer;
export const selectChapters = (state: RootState) => state.chapters;

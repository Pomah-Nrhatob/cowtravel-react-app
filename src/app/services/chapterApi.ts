import { Chapter } from "../types";
import { api } from "./api";

export const chapterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query<Chapter[], string>({
      query: (travelId) => ({
        url: `/chapter/${travelId}`,
        method: "GET",
      }),
    }),

    createChapter: builder.mutation<Chapter, Chapter>({
      query: (data) => ({
        url: "/chapter",
        method: "POST",
        body: data,
      }),
    }),
    updateChapter: builder.mutation<Chapter, Chapter>({
      query: (data) => ({
        url: `/chapter/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteChapter: builder.mutation<string | null, string | null>({
      query: (id) => ({
        url: `/chapter/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chapterApi;

export const {
  endpoints: { getChapters },
} = chapterApi;

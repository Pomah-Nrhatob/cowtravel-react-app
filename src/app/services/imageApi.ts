import { RootState } from "../store";
import { Image } from "../types";
import { api } from "./api";

export const imageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query({
      query: (chapterId) => ({
        url: `/uploadimage/${chapterId}`,
        method: "GET",
      }),
    }),

    updateImageInfo: builder.mutation({
      query: (data) => ({
        url: `uploadimage/${data.id}`,
        method: "PUT",
        body: { title: data.title },
      }),
    }),

    deleteImage: builder.mutation({
      query: (data) => ({
        url: `uploadimage/${data}`,
        method: "DELETE",
      }),
    }),

    uploadImageForMainPage: builder.mutation({
      query: (data) => ({
        url: `/imageForMainPage/${data.travelId}`,
        method: "POST",
        body: data.file,
      }),
    }),

    deleteImageForMainPage: builder.mutation({
      query: (data) => ({
        url: `/imageForMainPage/${data}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetImagesQuery,
  useDeleteImageMutation,
  useUpdateImageInfoMutation,
  useUploadImageForMainPageMutation,
  useDeleteImageForMainPageMutation,
} = imageApi;

export const {
  endpoints: { getImages },
} = imageApi;

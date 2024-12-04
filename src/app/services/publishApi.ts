import { api } from "./api";

export const publishApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postPublishTravel: builder.mutation({
      query: (data) => ({
        url: "/publisharticle",
        method: "POST",
        body: data,
      }),
    }),
    deletePublishTravel: builder.mutation({
      query: (data) => ({
        url: `/publisharticle/${data}`,
        method: "DELETE",
      }),
    }),
    updatePublish: builder.mutation({
      query: (data) => ({
        url: `/publisharticle/${data}`,
        method: "PUT",
      }),
    }),
    getPublishedArticle: builder.query({
      query: (articleId) => ({
        url: `/publisharticle/${articleId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostPublishTravelMutation,
  useDeletePublishTravelMutation,
  useUpdatePublishMutation,
  useLazyGetPublishedArticleQuery,
} = publishApi;

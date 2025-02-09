import { api } from "./api";

export const publishedTravelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPublishedTravels: builder.query({
      query: (queryParametrs) => ({
        url: `/publishedtravels${queryParametrs}`,
        method: "GET",
      }),
    }),

    likeArticle: builder.mutation({
      query: (data) => ({
        url: "/likeArticle",
        method: "POST",
        body: data,
      }),
    }),

    deleteLikeArticle: builder.mutation({
      query: (data) => ({
        url: "/likeArticle",
        method: "DELETE",
        body: data,
      }),
    }),

    getLikeArticles: builder.query({
      query: (data) => ({
        url: "/likeArticle",
        method: "GET",
        body: data,
      }),
    }),

    addFavoriteArticle: builder.mutation({
      query: (data) => ({
        url: "/favoriteArticle",
        method: "POST",
        body: data,
      }),
    }),

    deleteFavoriteArticle: builder.mutation({
      query: (data) => ({
        url: "/favoriteArticle",
        method: "DELETE",
        body: data,
      }),
    }),

    getFavoriteArticle: builder.query({
      query: (id) => ({
        url: `/favoriteArticle/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetPublishedTravelsQuery,
  useDeleteLikeArticleMutation,
  useLikeArticleMutation,
  useLazyGetLikeArticlesQuery,
  useLazyGetFavoriteArticleQuery,
  useAddFavoriteArticleMutation,
  useDeleteFavoriteArticleMutation,
} = publishedTravelApi;

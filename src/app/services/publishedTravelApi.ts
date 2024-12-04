import { api } from "./api";

export const publishedTravelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPublishedTravels: builder.query({
      query: (queryParametrs) => ({
        url: `/publishedtravels${queryParametrs}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetPublishedTravelsQuery } = publishedTravelApi;

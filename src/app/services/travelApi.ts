import { Travel } from "../types";
import { api } from "./api";

export const travelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTravels: builder.query<Travel[], void>({
      query: () => ({
        url: "/travel",
        method: "GET",
      }),
    }),
    getOneTravel: builder.query<Travel, string>({
      query: (id) => ({
        url: `/travel/${id}`,
        method: "GET",
      }),
    }),
    createTravel: builder.mutation<Travel, Travel>({
      query: (data) => ({
        url: "/travel",
        method: "POST",
        body: data,
      }),
    }),
    updateTravel: builder.mutation<Travel, Travel>({
      query: (data) => ({
        url: `/travel/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTravel: builder.mutation<
      {
        [x: string]: any;
      },
      {
        [x: string]: any;
      }
    >({
      query: (data) => ({
        url: `/travel/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetTravelsQuery,
  useLazyGetOneTravelQuery,
  useCreateTravelMutation,
  useUpdateTravelMutation,
  useDeleteTravelMutation,
} = travelApi;

export const {
  endpoints: { getTravels, getOneTravel },
} = travelApi;

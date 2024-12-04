import { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: "/user/registration",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
    refresh: builder.query<User, void>({
      query: () => ({
        url: "/user/refresh",
        method: "GET",
        credentials: "include",
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    forgorPassword: builder.query({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "PATCH",
        body: data,
      }),
    }),
    resetPassword: builder.query({
      query: (data) => ({
        url: `/user/reset-password/${data.token}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useRefreshQuery,
  useLazyRefreshQuery,
  useLazyLogoutQuery,
  useLazyForgorPasswordQuery,
  useLazyResetPasswordQuery,
} = userApi;

export const {
  endpoints: { login, register, current, logout },
} = userApi;

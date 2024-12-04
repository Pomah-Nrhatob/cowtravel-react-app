import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { RootState } from "../store";

let isRefreshing = false;
let refreshPromise: any = null;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = Promise.resolve(
        baseQuery(
          {
            url: `${BASE_URL}/api/user/refresh`,
            method: "GET",
            credentials: "include",
          },
          api,
          extraOptions
        )
      )
        .then((refreshResult) => {
          if (refreshResult.data) {
            const refreshTokenResult = refreshResult.data as any;

            localStorage.setItem("token", refreshTokenResult.token);
            isRefreshing = false;

            return refreshTokenResult;
          } else {
            isRefreshing = false;
            if (refreshResult?.error?.status === 500) {
              console.log("500");
            }
            return null;
          }
        })
        .catch((error: any) => {
          console.error("Error refreshing token", error);
          isRefreshing = false;
        });
    }

    await refreshPromise;
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

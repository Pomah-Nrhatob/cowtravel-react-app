import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userApi } from "../app/services/usersApi";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});

listenerMiddleware.startListening({
  matcher: userApi.endpoints.refresh.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});

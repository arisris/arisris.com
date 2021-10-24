import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const guestbookApiPath = "guestbook";
const sessionApiPath = "session";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: [ guestbookApiPath, sessionApiPath ],
  endpoints: build => ({
    checkSession: build.query({
      query: () => sessionApiPath,
      providesTags: [ { type: sessionApiPath } ]
    }),
    deleteSession: build.mutation({
      query: () => ({
        url: sessionApiPath,
        method: "DELETE"
      }),
      invalidatesTags: [ { type: sessionApiPath } ]
    }),
    getGuestbook: build.query({
      query: (page = 0) => `${guestbookApiPath}?page=${page}`,
      providesTags: result => result?.success
        ? [ ...result.data.map(({ key: id }) => ({ type: guestbookApiPath, id })), { type: guestbookApiPath, id: "LIST" } ]
        : [ { type: guestbookApiPath, id: "LIST" } ]
    }),
    reloadGuestbook: build.mutation({
      query: (page = 0) => `${guestbookApiPath}?page=${page}`,
      invalidatesTags: [ { type: guestbookApiPath, id: "LIST" } ]
    }),
    postGuestbook: build.mutation({
      query: (body) => ({
        url: guestbookApiPath,
        method: "POST",
        body
      }),
      invalidatesTags: [ { type: guestbookApiPath, id: "LIST" } ]
    }),
    deleteGuestbook: build.mutation({
      query: (key) => ({
        url: guestbookApiPath,
        method: "DELETE",
        body: { key }
      }),
      invalidatesTags: (_, __, id) => [ { type: guestbookApiPath, id } ]
    })
  })
});

export const GITHUB_LOGIN_URL = `/api/${sessionApiPath}?login_type=github`

export const {
  useCheckSessionQuery,
  useDeleteSessionMutation,
  useGetGuestbookQuery,
  usePostGuestbookMutation,
  useDeleteGuestbookMutation,
  useReloadGuestbookMutation
} = appApi;

const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware)
});

setupListeners(store.dispatch);

export default store;
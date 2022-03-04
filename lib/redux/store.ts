import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector } from "react-redux";
import { bundlerTools } from "./bundlerTools";
import { esBuildTools } from "./esBuildTools";
import guestbookApi from "./guestbookApi";
// import {
//   createApi,
//   fetchBaseQuery,
//   setupListeners
// } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    [bundlerTools.name]: bundlerTools.reducer,
    [esBuildTools.name]: esBuildTools.reducer,
    [guestbookApi.reducerPath]: guestbookApi.reducer
  },
  middleware: (gdm) => gdm().concat(guestbookApi.middleware)
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = () => useSelector((state: RootState) => state);
export const useAppDispatch = () => useDispatch<AppDispatch>();

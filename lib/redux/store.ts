import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector } from "react-redux";
import { esBuildTools } from "./esBuildTools";
import guestbookApi from "./guestbookApi";

export const store = configureStore({
  reducer: {
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

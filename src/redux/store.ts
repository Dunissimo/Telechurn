import { configureStore } from "@reduxjs/toolkit";
import { api } from "./rtk";
import { statusReducer } from "./slices/statusSlice";

export const store = configureStore({
  reducer: {
    status: statusReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

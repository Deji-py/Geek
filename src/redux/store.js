"use client";
import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "./tool/toolSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    toolReducer: toolReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

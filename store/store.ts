import { configureStore } from "@reduxjs/toolkit";
import seasonsReducer from "@/features/seasons/seasonsSlice";
import registrationReducer from "@/features/registration/registrationSlice";

export const store = configureStore({
  reducer: {
    seasons: seasonsReducer,
    registration: registrationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

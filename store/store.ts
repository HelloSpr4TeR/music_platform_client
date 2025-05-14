import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { reducer, RootState } from "./slices";
import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

const makeStore: MakeStore<RootState> = (context: Context) =>
  configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper<RootState>(makeStore, { debug: false });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
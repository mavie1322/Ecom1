import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Errors } from "../models";

const initialErrorState: Errors = {
  user_creation: "",
  not_login: false,
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState: initialErrorState,
  reducers: {
    errorUserCreation(state, action: PayloadAction<string>) {
      state.user_creation = action.payload;
    },
    errorUserLoggedIn(state, action: PayloadAction<boolean>) {
      state.not_login = action.payload;
    },
  },
});

export const errorsActions = errorsSlice.actions;

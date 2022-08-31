import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Errors } from "../models";

const initialErrorState: Errors = {
  user_creation: "",
  not_login: false,
  currentPasswordError: false,
  passwordUnmatched: false,
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
    errorCurrentPasswordIncorrect(state, action: PayloadAction<boolean>) {
      state.currentPasswordError = action.payload;
    },
    errorPasswordUnmatched(state, action: PayloadAction<boolean>) {
      state.passwordUnmatched = action.payload;
    },
  },
});

export const errorsActions = errorsSlice.actions;

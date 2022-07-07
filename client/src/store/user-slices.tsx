import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models";

const initialUserProfileState: User = {
  result: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: {
      street_address: "",
      flat_number: "",
      city: "",
      postcode: "",
      country: "",
    },
    delivery_address: {
      first_name: "",
      last_name: "",
      street_address: "",
      flat_number: "",
      city: "",
      postcode: "",
      country: "",
    },
    basket: [],
    orders: [],
    _id: "",
    __v: 0,
  },
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserProfileState,
  reducers: {
    storeUser(state, action: PayloadAction<User>) {
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.result = action.payload.result;
      state.token = action.payload.token;
    },
  },
});

export const userActions = userSlice.actions;

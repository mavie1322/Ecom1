import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsernameProfile } from "../models";

const initialUserProfileState: UsernameProfile = {
  username: "",
  avatar_url: "",
  kudos: 0,
  items_in_basket: 0,
  items_ordered: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserProfileState,
  reducers: {
    storeUser(state, action: PayloadAction<UsernameProfile>) {
      state.username = action.payload.username;
      state.avatar_url = action.payload.avatar_url;
      state.kudos = action.payload.kudos;
      state.items_in_basket = action.payload.items_in_basket;
      state.items_ordered = action.payload.items_ordered;
    },
    editUser() {},
  },
});

export const userActions = userSlice.actions;

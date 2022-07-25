import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Orders } from "../models";

const initialOrdersState: { purchases: Orders[] } = {
  purchases: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    storeOrders(state, action: PayloadAction<Orders[]>) {
      state.purchases = action.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;

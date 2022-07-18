import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Orders } from "../models";

const initialOrdersState: Orders = {
  _id: "",
  products: [],
  subtotal: 0,
  total: 0,
  createdAt: "",
  userId: "",
  delivery_status: "",
  payment_status: "",
  shipping: {
    first_name: "",
    last_name: "",
    street_address: "",
    flat_number: "",
    city: "",
    postcode: "",
    country: "",
  },
  stripeCustomerId: "",
  __v: 0,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    storeOrders(state, action: PayloadAction<Orders>) {
      state = action.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketItem, BasketState } from "../models";

const initialBasketState: BasketState = {
  items: [],
  total_quantity: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState: initialBasketState,
  reducers: {
    getItemInBasket() {},
    addItemToBasket(state, action: PayloadAction<BasketItem>) {
      const newItem = action.payload;
      let isItemExist = state.items.find(
        (item) => item.item_basket.item_id === newItem.item_basket.item_id
      );
      if (isItemExist) {
        isItemExist.quantity_ordered++;
        // isItemExist.total_price += newItem.item_basket.price;
      } else {
        state.items.push(action.payload);
      }

      state.total_quantity++;
    },
    removeItemFromBasket(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.item_basket.item_id !== action.payload
      );
      state.total_quantity = state.items.reduce((total, item) => {
        total += item.quantity_ordered;
        return total;
      }, 0);
    },
    changeItemQuantity(state, action: PayloadAction<[number, number]>) {
      const [newQuantity, item_id] = action.payload;

      state.items = state.items.map((item) => {
        if (item.item_basket.item_id === item_id)
          item.quantity_ordered = newQuantity;
        return item;
      });
      state.total_quantity = state.items.reduce((total, item) => {
        total += item.quantity_ordered;
        return total;
      }, 0);
    },
  },
});

export const basketActions = basketSlice.actions;

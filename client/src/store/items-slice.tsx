import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleFromApi, ArticleState } from "../models/index";

const initialItemsListState: ArticleState = {
  itemsList: [],
  totalItems: 0,
  searchItem: "",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState: initialItemsListState,
  reducers: {
    storeItems(state, action: PayloadAction<ArticleFromApi>) {
      if (state.itemsList.length === 0) {
        state.itemsList = action.payload.items;
        state.totalItems = action.payload.total_items;
      }
    },
    setSearchItems(state, action: PayloadAction<string>) {
      state.searchItem = action.payload;
    },
    addItem(state, action) {
      //action needs to be an array with one object(item)
      action.payload.item.concat(state.itemsList);
      state.totalItems++;
    },
  },
});

export const itemsActions = itemsSlice.actions;

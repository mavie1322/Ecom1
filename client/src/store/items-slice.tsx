import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, ArticleState } from "../models/index";

const initialItemsListState: ArticleState = {
  itemsList: [],
  searchItem: "",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState: initialItemsListState,
  reducers: {
    storeItems(state, action: PayloadAction<Article[]>) {
      state.itemsList = action.payload;
    },
    setSearchItems(state, action: PayloadAction<string>) {
      state.searchItem = action.payload;
    },
  },
});

export const itemsActions = itemsSlice.actions;

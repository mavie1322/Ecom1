import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState } from "../models";

const initialCategoriesState: CategoriesState = {
  categories: [],
  selected_category: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {
    storeCategories(state, action: PayloadAction<CategoriesState>) {
      if (state.categories.length === 0) {
        state.categories = action.payload.categories;
      }
    },
    addCategory() {},
    pickedCategory(state, action: PayloadAction<string>) {
      state.selected_category = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

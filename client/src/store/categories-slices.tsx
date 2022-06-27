import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoriesState } from "../models";

const initialCategoriesState: CategoriesState = {
  categories: [],
  selected_category: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {
    storeCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    pickedCategory(state, action: PayloadAction<string>) {
      state.selected_category = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

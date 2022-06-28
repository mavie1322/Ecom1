import { Category } from "../models";
import { getCategories } from "../services/api";
import { categoriesActions } from "../store/categories-slices";

export const fetchCategories = () => {
  return async (dispatch: any) => {
    try {
      const categoriesList: Category[] = await getCategories();
      dispatch(categoriesActions.storeCategories(categoriesList));
    } catch (err: any) {
      throw new Error(err);
    }
  };
};

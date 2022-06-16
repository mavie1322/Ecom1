import { ArticleFromApi } from "../models";
import { getItems } from "../services/api";
import { itemsActions } from "./items-slice";

export const fetchItems = () => {
  return async (dispatch: any) => {
    try {
      const itemsList: ArticleFromApi = await getItems();
      dispatch(itemsActions.storeItems(itemsList));
    } catch (err: any) {
      throw new Error(err);
    }
  };
};

import { Article } from "../models";
import { getItems } from "../services/api";
import { itemsActions } from "../store/items-slice";

export const fetchItems = () => {
  return async (dispatch: any) => {
    try {
      const itemsList: Article[] = await getItems();
      dispatch(itemsActions.storeItems(itemsList));
    } catch (err: any) {
      throw new Error(err);
    }
  };
};

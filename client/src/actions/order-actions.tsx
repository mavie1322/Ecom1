import { BasketItem } from "../models";
import { payWithStripe } from "../services/api";

export const payOrder = (basketItems: BasketItem[], userId: string) => {
  return async (dispatch: any) => {
    try {
      const order = await payWithStripe({ basketItems, userId });
      if (order.url) window.location.href = order.url;
    } catch (error) {
      console.log(error);
    }
  };
};

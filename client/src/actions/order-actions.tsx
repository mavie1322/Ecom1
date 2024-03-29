import { BasketItem, Orders } from "../models";
import { fetchOrdersByUser, payWithStripe } from "../services/api";
import { ordersActions } from "../store/orders-slices";

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

export const getOrdersById = (orders: string[]) => {
  return async (dispatch: any) => {
    try {
      const ordersApi: { orders: Orders[] } = await fetchOrdersByUser({
        orders,
      });
      dispatch(ordersActions.storeOrders(ordersApi.orders));
    } catch (error) {
      console.log(error);
    }
  };
};

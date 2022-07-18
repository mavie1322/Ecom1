import React, { useEffect } from "react";
import { getOrdersById } from "../../actions/order-actions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./orders.css";

const Orders = () => {
  const orders = useAppSelector((state) => state.user.result.orders);
  const user = useAppSelector((state) => state.orders);

  const dispatch = useAppDispatch();
  console.log("order >>>", orders);
  console.log("user >>>", user);

  useEffect(() => {
    dispatch(getOrdersById(orders));
  }, [orders, dispatch]);
  console.log(orders);
  return (
    <div>
      <h1>My Purchases</h1>
    </div>
  );
};

export default Orders;

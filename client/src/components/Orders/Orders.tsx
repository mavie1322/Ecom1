import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import "./orders.css";

const Orders = () => {
  const orders = useAppSelector((state) => state.user);
  console.log(orders);
  return (
    <div>
      <h1>My Purchases</h1>
    </div>
  );
};

export default Orders;

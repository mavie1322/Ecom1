import { useEffect } from "react";
import { getOrdersById } from "../../actions/order-actions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { AiOutlineRight } from "react-icons/ai";
import "./orders.css";
import { Link } from "react-router-dom";

const Orders = () => {
  const orders = useAppSelector((state) => state.orders.purchases);
  const user = useAppSelector((state) => state.user.result);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrdersById(user.orders));
  }, [user, dispatch]);

  return (
    <div className='order__container'>
      <h1>My Purchases</h1>
      <section className='order__section'>
        {orders.map((order) => {
          const dateArray = order.createdAt
            .substring(0, 10)
            .replaceAll("-", "/")
            .split("/")
            .reverse();
          const date = dateArray.join("/");
          return (
            <Link
              key={order._id}
              className='order__span link'
              to={`/users/${user._id}/orders/${order._id}`}>
              <h2>{date}</h2>
              <AiOutlineRight size={22} className='order__icon' />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Orders;

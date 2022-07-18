import React, { useContext, useEffect } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../actions/user-actions";
import { BasketContext } from "../../../context/basket";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { BasketContextType } from "../../../models";
import "./succeedCheckout.css";

const SucceedCheckout = () => {
  const id: Readonly<Params<string>> = useParams();
  const { isCheckout, changeCheckout, isDisplayed, changeIsDisplayed } =
    useContext(BasketContext) as BasketContextType;
  const user = useAppSelector((state) => state.user.result);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(">>>", user);

  const handleClick = () => {
    navigate("/");
    changeCheckout();
    changeIsDisplayed();
  };

  useEffect(() => {
    if (isCheckout === false && isDisplayed === false) {
      changeCheckout();
      changeIsDisplayed();
    }
    dispatch(getUser(id));
  }, [
    changeCheckout,
    dispatch,
    id,
    isCheckout,
    isDisplayed,
    changeIsDisplayed,
  ]);

  return (
    <div className='succeedCheckout section__margin'>
      <h1>Thank you for your purchase!</h1>
      <span>
        <p>
          Your order number is :{" "}
          <strong>{user.orders[user.orders.length - 1]}</strong>
        </p>
        <p>We'll email you an order confirmation with details</p>
      </span>
      <button
        type='button'
        className='basketMenu__checkout font-styling'
        onClick={() => handleClick()}>
        Continue Shopping
      </button>
    </div>
  );
};

export default SucceedCheckout;

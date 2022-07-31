import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { payOrder } from "../actions/order-actions";
import { BasketContext } from "../context/basket";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { BasketContextType } from "../models";

const BasketCost = () => {
  const user = useAppSelector((state) => state.user.result);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isCheckout, changeCheckout } = useContext(
    BasketContext
  ) as BasketContextType;
  const delivery: number = 3.99;
  const orderValue: number =
    user.basket.reduce((total, item) => {
      total += item.item_basket.price * item.quantity_ordered;
      return total;
    }, 0) / 100;

  const handleCheckout = async () => {
    if (
      isCheckout &&
      (user.address.street_address !== "" ||
        user.delivery_address.street_address !== "")
    ) {
      dispatch(payOrder(user.basket, user._id));
    }
  };
  const handleProceedCheckout = () => {
    if (user.basket.length > 0) {
      navigate(`/users/${user._id}/checkout`);
      changeCheckout();
    }
  };

  return (
    <div className='basket__cost'>
      <div className='basket__discount'>
        <p>Discounts</p>
        <p>Apply discount</p>
      </div>
      <div className='basket__cost-container'>
        <div>
          <p>Order value</p>
          <p>£{orderValue.toFixed(2)}</p>
        </div>
        {/* if there is items in the basket delivery cost will be add to the total cost */}
        {user.basket.length !== 0 && (
          <div>
            <p>Delivery</p>
            <p>£{delivery}</p>
          </div>
        )}
      </div>
      {/* show the total cost */}
      <span className='basket__cost-total basketMenu__total-value'>
        <p>Total</p>
        {user.basket.length === 0 ? (
          <p>£{orderValue.toFixed(2)}</p>
        ) : (
          <p>£{(delivery + orderValue).toFixed(2)}</p>
        )}
      </span>

      {/* display redirect buttons to checkout component */}
      {isCheckout ? (
        <>
          <button
            type='submit'
            className='basketMenu__checkout font-styling'
            onClick={() => handleCheckout()}
            style={{
              backgroundColor:
                user.address.street_address === "" ||
                user.delivery_address.street_address === ""
                  ? "white"
                  : "black",
              color:
                user.address.street_address === "" ||
                user.delivery_address.street_address === ""
                  ? "black"
                  : "white",
              cursor:
                user.address.street_address === "" ||
                user.delivery_address.street_address === ""
                  ? "no-drop"
                  : "pointer",
            }}>
            Almost done
          </button>{" "}
          <span className='basket__checkout'>
            <p className='basket__important '>
              Only Standard delivery available at the moment.
            </p>
            <p className='basket__important'>
              It would take 3-5 working days to receive your parcel.
            </p>
            <p className='basket__important'>No delivery on Bank holidays</p>
          </span>
        </>
      ) : (
        <>
          <button
            type='button'
            className='font-styling'
            onClick={() => handleProceedCheckout()}
            style={{
              backgroundColor: user.basket.length > 0 ? "black" : "white",
              color: user.basket.length > 0 ? "white" : "black",
              cursor: user.basket.length === 0 ? "no-drop" : "pointer",
            }}>
            Continue to checkout
          </button>
          <div className='basket__transaction-container'>
            <p>We accept</p>
            <p>Credit cards</p>
          </div>

          <p className='basket__important'>
            Prices and delivery costs are not confirmed until you've reached the
            checkout.
          </p>
          <p className='basket__important'>
            28 days withdrawal and free returns.
          </p>
        </>
      )}
    </div>
  );
};

export default BasketCost;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/basket";
import { useAppSelector } from "../hooks/hooks";
import { BasketContextType } from "../models";

const BasketCost = () => {
  const user = useAppSelector((state) => state.user.result);
  const navigate = useNavigate();
  const { isCheckout, changeCheckout } = useContext(
    BasketContext
  ) as BasketContextType;
  const delivery: number = 25.99;
  const orderValue: number = user.basket.reduce((total, item) => {
    total += item.item_basket.price * item.quantity_ordered;
    return total;
  }, 0);

  const handleCheckout = () => {
    if (isCheckout) {
      console.log("yes");
    } else {
      navigate(`/users/${user._id}/checkout`);
      changeCheckout();
    }
  };

  return (
    <div className='basket__cost'>
      <span className='basket__discount'>
        <p>Discounts</p>
        <p>Apply discount</p>
      </span>
      <div className='basket__cost-container'>
        <span>
          <p>Order value</p>
          <p>£{orderValue.toFixed(2)}</p>
        </span>
        {/* if there is items in the basket delivery cost will be add to the total cost */}
        {user.basket.length !== 0 && (
          <span>
            <p>Delivery</p>
            {orderValue > 2000 ? <p>FREE</p> : <p>£{delivery}</p>}
          </span>
        )}
      </div>
      {/* show the total cost */}
      <span className='basketMenu__total-value'>
        <p>Total</p>
        {user.basket.length === 0 || orderValue > 2000 ? (
          <p>£{orderValue.toFixed(2)}</p>
        ) : (
          <p>£{(delivery + orderValue).toFixed(2)}</p>
        )}
      </span>

      {/* display redirect buttons to checkout component */}
      <button
        type='button'
        className='basketMenu__checkout font-styling'
        onClick={() => handleCheckout()}>
        {isCheckout ? "Almost done" : "Continue to checkout"}
      </button>
      {isCheckout ? (
        <>
          <span className='basket__checkout'>
            <p className='basket__important '>
              Only Standard delivery available at the moment.
            </p>
            <p className='basket__important'>
              It would take 2-4 working days to receive your parcel.
            </p>
            <p className='basket__important'>No delivery on Bank holidays</p>
          </span>
        </>
      ) : (
        <>
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

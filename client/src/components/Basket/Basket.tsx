import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./basket.css";
import { useDispatch } from "react-redux";
import { basketActions } from "../../store/basket-slices";

const Basket = () => {
  const itemsInBasket = useAppSelector((state) => state.basket);
  const [itemQuantity, setItemQuantity] = useState<[number, number]>([0, 0]);
  const [itemToDelete, setItemToDelete] = useState<number>(0);
  const delivery: number = 25.99;
  const orderValue: number = itemsInBasket.items.reduce((total, item) => {
    total += item.item_basket.price * item.quantity_ordered;
    return total;
  }, 0);
  const dispatch = useDispatch();

  const handleCheckout = () => {};

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    item_id: number
  ) => {
    //find item to update and change quantity
    e.preventDefault();
    setItemQuantity([parseInt(e.target.value), item_id]);
  };

  const handleDeleteItem = (item_id: number) => {
    setItemToDelete(item_id);
  };

  useEffect(() => {
    dispatch(basketActions.changeItemQuantity(itemQuantity));
  }, [dispatch, itemQuantity]);

  useEffect(() => {
    dispatch(basketActions.removeItemFromBasket(itemToDelete));
  }, [dispatch, itemToDelete]);

  return (
    <div className='basket'>
      <div className='basket__title'>Shopping Bag</div>
      <div className='basket__container'>
        {/* present items in the basket */}
        <div className='basket__items'>
          {itemsInBasket.items.length === 0 ? (
            <div className='basket__empty'>YOUR SHOPPING BAG IS EMPTY!</div>
          ) : (
            itemsInBasket.items.map((item) => {
              const { item_basket, quantity_ordered } = item;
              const { category_name, img_url, item_name, price, item_id } =
                item_basket;
              return (
                <div className='basket__items-container' key={item_id}>
                  <img src={img_url} alt={item_name} />
                  <div className='basket__items-container__details'>
                    <div className='basket__items-container__details-header'>
                      <span>
                        <p>{item_name}</p>
                        <p>£{price}</p>
                      </span>
                      <RiDeleteBin5Line
                        className='basket__items-container__details-icon'
                        onClick={() => handleDeleteItem(item_id)}
                      />
                    </div>
                    <div className='basket__items-container__details-span'>
                      <span>
                        <p>Category:</p>
                        <p>{category_name}</p>
                      </span>
                      <span>
                        <p>Total:</p>
                        <p>£{price * quantity_ordered}</p>
                      </span>
                    </div>
                    <select
                      value={quantity_ordered}
                      onChange={(e) => handleChangeQuantity(e, item_id)}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </select>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* total cost of items in basket */}
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
            {itemsInBasket.items.length !== 0 && (
              <span>
                <p>Delivery</p>
                {orderValue > 1000 ? <p>FREE</p> : <p>£{delivery}</p>}
              </span>
            )}
          </div>
          {/* show the total cost */}
          <span className='basketMenu__total-value'>
            <p>Total</p>
            {itemsInBasket.items.length === 0 || orderValue > 1000 ? (
              <p>£{orderValue.toFixed(2)}</p>
            ) : (
              <p>£{(delivery + orderValue).toFixed(2)}</p>
            )}
          </span>

          {/* display redirect buttons to checkout component */}
          <button
            className='basketMenu__checkout font-styling'
            onClick={() => handleCheckout()}>
            Continue to checkout
          </button>
          <div className='basket__transaction-container'>
            <p>We accept</p>
            <p>Credit cards</p>
          </div>
          {/*important information */}
          <p className='basket__important'>
            Prices and delivery costs are not confirmed until you've reached the
            checkout.
          </p>
          <p className='basket__important'>
            28 days withdrawal and free returns.
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Basket;

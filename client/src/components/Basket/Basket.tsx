import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./basket.css";

import { changeItemQuantity, deleteItem } from "../../actions/user-actions";
import { useParams, Link } from "react-router-dom";
import BasketCost from "../../containers/BasketCost";

const Basket = () => {
  const { id } = useParams<string>();
  const userBasket = useAppSelector((state) => state.user.result.basket);
  const [itemQuantity, setItemQuantity] = useState<[number, string]>([0, ""]);
  const [itemToDelete, setItemToDelete] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    _id: string
  ) => {
    //find item to update and change quantity
    e.preventDefault();
    setItemQuantity([parseInt(e.target.value), _id]);
  };

  const handleDeleteItem = (_id: string) => {
    setItemToDelete(_id);
  };

  useEffect(() => {
    dispatch(changeItemQuantity(itemQuantity, id!));
  }, [dispatch, itemQuantity, id]);

  useEffect(() => {
    dispatch(deleteItem(itemToDelete, id!));
  }, [dispatch, itemToDelete, id]);

  return (
    <div className='basket'>
      <div className='basket__title'>Shopping Bag</div>
      <div className='basket__container'>
        {/* present items in the basket */}
        <div className='basket__items'>
          {userBasket.length === 0 ? (
            <div className='basket__empty'>YOUR SHOPPING BAG IS EMPTY!</div>
          ) : (
            userBasket.map((item) => {
              const { item_basket, quantity_ordered } = item;
              const { category_name, img_url, item_name, price, _id } =
                item_basket;
              return (
                <div className='basket__items-container' key={_id}>
                  <Link to={`/products/${_id}`} className='link basket__link'>
                    <img
                      src={img_url}
                      alt={item_name}
                      className='basket__items-container__img'
                    />
                  </Link>
                  <div className='basket__items-container__details'>
                    <div className='basket__items-container__details-header'>
                      <span>
                        <p>{item_name}</p>
                        <p>£{(price / 100).toFixed(2)}</p>
                      </span>
                      <RiDeleteBin5Line
                        className='basket__items-container__details-icon'
                        onClick={() => handleDeleteItem(_id)}
                      />
                    </div>
                    <div className='basket__items-container__details-span'>
                      <span>
                        <p>Category:</p>
                        <p>{category_name}</p>
                      </span>
                      <span>
                        <p>Total:</p>
                        <p>
                          &emsp;&emsp;£
                          {((price / 100) * quantity_ordered).toFixed(2)}
                        </p>
                      </span>
                    </div>
                    <select
                      value={quantity_ordered}
                      onChange={(e) => handleChangeQuantity(e, _id)}>
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
        <BasketCost />
      </div>
    </div>
  );
};

export default Basket;

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../../../context/basket";
import { useAppSelector } from "../../../hooks/hooks";
import { BasketContextType } from "../../../models";
import "./basketSubmenu.css";

type Props = {
  togglePopup: () => void;
};

const BasketSubMenu: React.FC<Props> = ({ togglePopup }) => {
  const { itemsInBasket } = useContext(BasketContext) as BasketContextType;
  const userLoggedIn = useAppSelector((state) => state.user.result._id);
  const delivery: number = 3.99;
  const navigate = useNavigate();
  let orderValue: number = itemsInBasket.reduce((total, item) => {
    total += item.item_basket.price * item.quantity_ordered;
    return total;
  }, 0);

  const redirectToBasketHandler = () => {
    if (userLoggedIn) navigate(`/users/${userLoggedIn}/basket`);
    else togglePopup();
  };

  return (
    <div className='basketMenu'>
      <div className='basketMenu__container'>
        <div className='basketMenu__items'>
          {itemsInBasket.length === 0 ? (
            <p className='font-styling'>Your basket is empty</p>
          ) : (
            // loop through the items in the basket to display in the submenu
            <>
              {itemsInBasket.map((item) => {
                const { item_basket, quantity_ordered } = item;
                const { item_name, price, img_url, _id } = item_basket;
                return (
                  <Link key={_id} to={`/products/${_id}`} className='link'>
                    <div className='basketSubmenu'>
                      <div>
                        <img src={img_url} alt={item_name} />
                      </div>
                      <div className='basketSubmenu__info'>
                        <span>{item_name}</span>
                        <span>£{price}</span>
                        <span>
                          Quantity: {"   "}
                          {quantity_ordered}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </>
          )}{" "}
        </div>
        {/* show the order value, delivery and total amount */}
        <div className='basketMenu__total'>
          <div className='basketMenu__total-cost'>
            <span>
              <p>Order value</p>
              <p>£{orderValue.toFixed(2)}</p>
            </span>
            {/* if there is items in the basket delivery cost will be add to the total cost */}
            {itemsInBasket.length !== 0 && (
              <span>
                <p>Delivery</p>
                {orderValue > 2000 ? <p>FREE</p> : <p>£{delivery}</p>}
              </span>
            )}
          </div>
          {/* show the total cost */}
          <span className='basketMenu__total-value'>
            <p>Total</p>
            {itemsInBasket.length === 0 || orderValue > 2000 ? (
              <p>£{orderValue.toFixed(2)}</p>
            ) : (
              <p>£{(delivery + orderValue).toFixed(2)}</p>
            )}
          </span>
        </div>
      </div>
      {/* display redirect buttons to checkout or basket component */}
      <button className='basketMenu__checkout font-styling'>Checkout</button>
      <button
        className='basketMenu__basket font-styling'
        onClick={() => redirectToBasketHandler()}>
        Basket
      </button>
    </div>
  );
};

export default BasketSubMenu;

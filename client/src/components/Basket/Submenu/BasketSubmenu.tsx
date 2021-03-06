import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../../../context/basket";
import { useAppSelector } from "../../../hooks/hooks";
import { BasketContextType, BasketItem } from "../../../models";
import "./basketSubmenu.css";

type Props = {
  togglePopup: () => void;
};

const BasketSubMenu: React.FC<Props> = ({ togglePopup }) => {
  const userLoggedIn = useAppSelector((state) => state.user.result);
  const { itemsInBasket, changeCheckout } = useContext(
    BasketContext
  ) as BasketContextType;
  const [productsInBasket, setProductsInBasket] = useState<BasketItem[]>([]);
  const delivery: number = 3.99;
  const navigate = useNavigate();
  let orderValue: number =
    productsInBasket.reduce((total, item) => {
      total += item.item_basket.price * item.quantity_ordered;
      return total;
    }, 0) / 100;

  const redirectToBasketHandler = () => {
    if (userLoggedIn._id) navigate(`/users/${userLoggedIn._id}/basket`);
    else togglePopup();
  };

  const handleCheckout = () => {
    navigate(`/users/${userLoggedIn._id}/checkout`);
    changeCheckout();
  };

  useEffect(() => {
    userLoggedIn.email === ""
      ? setProductsInBasket([...itemsInBasket])
      : setProductsInBasket([...userLoggedIn.basket]);
  }, [itemsInBasket, userLoggedIn.basket, userLoggedIn.email]);

  return (
    <div className='basketMenu'>
      <div className='basketMenu__container'>
        <div className='basketMenu__items'>
          {productsInBasket.length === 0 ? (
            <p className='font-styling'>Your basket is empty</p>
          ) : (
            // loop through the items in the basket to display in the submenu
            <>
              {productsInBasket.map((item) => {
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
                        <span>??{(price / 100).toFixed(2)}</span>
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
              <p>??{orderValue.toFixed(2)}</p>
            </span>
            {/* if there is items in the basket delivery cost will be add to the total cost */}
            {productsInBasket.length !== 0 && (
              <span>
                <p>Delivery</p>
                {<p>??{delivery}</p>}
              </span>
            )}
          </div>
          {/* show the total cost */}
          <span className='basketMenu__total-value'>
            <p>Total</p>
            {productsInBasket.length === 0 ? (
              <p>??{orderValue.toFixed(2)}</p>
            ) : (
              <p>??{(delivery + orderValue).toFixed(2)}</p>
            )}
          </span>
        </div>{" "}
        {productsInBasket.length > 0 && (
          <>
            {/* display redirect buttons to checkout or basket component */}
            <button
              className='basketMenu__checkout font-styling'
              onClick={() => handleCheckout()}>
              Checkout
            </button>
            <button
              className='basketMenu__basket font-styling'
              onClick={() => redirectToBasketHandler()}>
              Basket
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BasketSubMenu;

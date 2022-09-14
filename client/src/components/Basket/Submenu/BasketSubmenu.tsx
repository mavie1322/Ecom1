import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../../../context/basket";
import { useAppSelector } from "../../../hooks/hooks";
import { BasketContextType, BasketItem } from "../../../models";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
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
  const [index, setIndex] = useState<number>(0);
  const delivery: number = 3.99;
  const navigate = useNavigate();
  let orderValue: number =
    productsInBasket.reduce((total, item) => {
      total += item.item_basket.price * item.quantity_ordered;
      return total;
    }, 0) / 100;

  console.log(productsInBasket);

  const redirectToBasketHandler = () => {
    if (userLoggedIn._id) navigate(`/users/${userLoggedIn._id}/basket`);
    else togglePopup();
  };

  const handleCheckout = () => {
    navigate(`/users/${userLoggedIn._id}/checkout`);
    changeCheckout();
  };

  const goToPreviousItem = () => {
    let newIndex = index - 1;
    if (newIndex < 0) setIndex(productsInBasket.length - 1);
    else setIndex(newIndex);
  };
  const goToNextItem = () => {
    let newIndex = index + 1;
    if (newIndex > productsInBasket.length - 1) setIndex(0);
    else setIndex(newIndex);
  };

  useEffect(() => {
    userLoggedIn.email === ""
      ? setProductsInBasket([...itemsInBasket])
      : setProductsInBasket([...userLoggedIn.basket]);
  }, [itemsInBasket, userLoggedIn.basket, userLoggedIn.email]);

  return (
    <div className='basketMenu'>
      <div className='basketMenu__items'>
        {productsInBasket.length === 0 ? (
          <p className='font-styling'>Your basket is empty</p>
        ) : (
          // loop through the items in the basket to display in the submenu
          <>
            {productsInBasket.length > 1 && (
              <button
                type='button'
                onClick={() => goToPreviousItem()}
                className='basketMenu__button'>
                <IoIosArrowUp size={20} />
              </button>
            )}
            <Link
              key={productsInBasket[index].item_basket._id}
              to={`/products/${productsInBasket[index].item_basket._id}`}
              className='link'>
              <div className='basketSubmenu'>
                <div>
                  <img
                    src={productsInBasket[index].item_basket.img_url}
                    alt={productsInBasket[index].item_basket.item_name}
                  />
                </div>
                <div className='basketSubmenu__info'>
                  <span>{productsInBasket[index].item_basket.item_name}</span>
                  <span>
                    £
                    {(productsInBasket[index].item_basket.price / 100).toFixed(
                      2
                    )}
                  </span>
                  <span>
                    Quantity: {"   "}
                    {productsInBasket[index].quantity_ordered}
                  </span>
                </div>
              </div>
            </Link>
            {productsInBasket.length > 1 && (
              <button
                type='button'
                onClick={() => goToNextItem()}
                className='basketMenu__button'>
                <IoIosArrowDown size={20} />
              </button>
            )}
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
          {productsInBasket.length !== 0 && (
            <span>
              <p>Delivery</p>
              {<p>£{delivery}</p>}
            </span>
          )}
        </div>
        {/* show the total cost */}
        <span className='basketMenu__total-value'>
          <p>Total</p>
          {productsInBasket.length === 0 ? (
            <p>£{orderValue.toFixed(2)}</p>
          ) : (
            <p>£{(delivery + orderValue).toFixed(2)}</p>
          )}
        </span>
      </div>{" "}
      {productsInBasket.length > 0 && (
        <>
          {/* display redirect buttons to checkout or basket component */}
          <button
            className='basketMenu__checkout fonts-styling'
            onClick={() => handleCheckout()}>
            Checkout
          </button>
          <button
            className='basketMenu__basket fonts-styling'
            onClick={() => redirectToBasketHandler()}>
            Basket
          </button>
        </>
      )}
    </div>
  );
};

export default BasketSubMenu;

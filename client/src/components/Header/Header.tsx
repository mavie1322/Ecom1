import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import "./header.css";
import { BsPerson, BsBasket3 } from "react-icons/bs";
import { RiMenu2Line, RiCloseLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { TextField } from "@mui/material";

import { fetchCategories } from "../../actions/categories-actions";
import Categories from "../../containers/Categories";
import { categoriesActions } from "../../store/categories-slices";
import BasketSubmenu from "../Basket/Submenu/BasketSubmenu";
import SignIn from "../SignIn/SignIn";
import SignInSubmenu from "../SignIn/Submenu/SignInSubmenu";
import { itemsActions } from "../../store/items-slice";
import { errorsActions } from "../../store/errors-slices";
import { BasketContext } from "../../context/basket";
import { BasketContextType } from "../../models";

const Header: React.FC = () => {
  const { itemsInBasket } = useContext(BasketContext) as BasketContextType;
  const categoriesList = useAppSelector((state) => state.categories.categories);
  let isLoggedIn = useAppSelector((state) => state.user.result._id);
  const userInformation = useAppSelector((state) => state.user.result);
  const dispatch = useAppDispatch();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isHoveringBasket, setIsHoveringBasket] = useState<boolean>(false);
  const [isHoveringSignIn, setIsHoveringSignIn] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const navigate = useNavigate();
  const basketTotalQuantity = itemsInBasket.reduce((total, item) => {
    total += item.quantity_ordered;
    return total;
  }, 0);

  const selectCategoryHandler = () => {
    dispatch(categoriesActions.pickedCategory(""));
    dispatch(itemsActions.setSearchItems(""));
  };

  const togglePopup = () => {
    setOpenPopup(!openPopup);
    dispatch(errorsActions.errorUserLoggedIn(false));
    dispatch(errorsActions.errorUserCreation(""));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setIsSearching(false);
      dispatch(categoriesActions.pickedCategory(""));
      dispatch(itemsActions.setSearchItems(inputText));
      navigate("/");
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let input = event.target.value;
    setInputText(input);
  };
  // console.log(isLoggedIn);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className='header section__margin'>
      <div className='header__navbar'>
        <div className='header__navbar-container'>
          <div className='header__navbar-menu'>
            {/* show categories menu and logo when the screen size is less than 1050px */}
            {toggleMenu ? (
              <RiCloseLine
                className='header__navbar-menu_icons'
                color='#000'
                size={27}
                onClick={() =>
                  setToggleMenu((previousToggle) => !previousToggle)
                }
              />
            ) : (
              <RiMenu2Line
                className='header__navbar-menu_icons'
                color='#000'
                size={27}
                onClick={() =>
                  setToggleMenu((previousToggle) => !previousToggle)
                }
              />
            )}
            {toggleMenu && (
              <div className='header__navbar-menu_container scale-up-ver-top'>
                <Categories categoriesList={categoriesList} />
              </div>
            )}
          </div>
          <div className='header__small-logo'>
            <Link to={"/"} className='link'>
              <span onClick={() => selectCategoryHandler()}>
                <p>E</p>
                <p>.com</p>
              </span>
            </Link>
          </div>
        </div>
        {/* header icons sign in, search and basket */}
        {/* Sign in */}
        <div className='header__icons'>
          <div
            className='header__icons-container link header__navbar-menu'
            onMouseOver={() => setIsHoveringSignIn(true)}
            onMouseOut={() => setIsHoveringSignIn(false)}
            onClick={() => togglePopup()}>
            <BsPerson className='header__icons-size' />
            {/* if user logged in his name should appear or sign in */}
            {isLoggedIn ? (
              <p>{`${userInformation.first_name} ${userInformation.last_name}`}</p>
            ) : (
              <p>Sign In</p>
            )}
          </div>
          {/* when the user logged in and hover over this icon, the customer information submenu will appear */}
          {isHoveringSignIn && isLoggedIn && (
            <div
              className='header__navbar-menu_container header__sign-hover scale-up-ver-top'
              onMouseOver={() => setIsHoveringSignIn(true)}
              onMouseOut={() => setIsHoveringSignIn(false)}>
              <SignInSubmenu />
            </div>
          )}
          {/* pop up window will appear when the user want to sign in */}
          {openPopup && !isLoggedIn && <SignIn togglePopup={togglePopup} />}
          {/* Search */}
          <div
            className='header__icons-container'
            onClick={() => setIsSearching(!isSearching)}>
            <IoSearchOutline className='header__icons-size' />
            <p>Search</p>
          </div>
          {isSearching && (
            <div className='header__navbar-menu_container header__search-hover scale-up-ver-top'>
              <TextField
                fullWidth
                color='secondary'
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => handleInputChange(e)}
                className='header__search-container'
                label='Search Products'></TextField>
            </div>
          )}
          {/* Basket */}
          <div>
            {/* can't access basket without signing in */}
            {isLoggedIn ? (
              <>
                <Link
                  to={`/users/${isLoggedIn}/basket`}
                  className='link header__icons-container header__navbar-menu'
                  onMouseOver={() => setIsHoveringBasket(true)}
                  onMouseOut={() => setIsHoveringBasket(false)}>
                  <BsBasket3 className='header__icons-size' />
                  <p>Basket({basketTotalQuantity})</p>
                </Link>
              </>
            ) : (
              <>
                <div
                  className='link header__icons-container header__navbar-menu'
                  onMouseOver={() => setIsHoveringBasket(true)}
                  onMouseOut={() => setIsHoveringBasket(false)}
                  onClick={() => togglePopup()}>
                  <BsBasket3 className='header__icons-size' />
                  <p>Basket({basketTotalQuantity})</p>
                </div>
              </>
            )}
            {/* show the submenu basket when user hover on the basket icon when the screen width is over 1050px */}
            {isHoveringBasket && (
              <div
                className='header__navbar-menu_container header__basket-hover scale-up-ver-top'
                onMouseOver={() => setIsHoveringBasket(true)}
                onMouseOut={() => setIsHoveringBasket(false)}>
                <BasketSubmenu togglePopup={togglePopup} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Logo */}
      <div className='header__logo'>
        <Link to={"/"} className='link'>
          <span onClick={() => selectCategoryHandler()}>
            <p>E</p>
            <p>.com</p>
          </span>
        </Link>
      </div>
      {/* Categories list */}
      <div className='header__categories'>
        <Categories categoriesList={categoriesList} />
      </div>
    </div>
  );
};

export default Header;

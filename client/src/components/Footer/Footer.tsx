import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { BsTwitter, BsInstagram, BsYoutube, BsFacebook } from "react-icons/bs";
import "./footer.css";
import { Link, useNavigate } from "react-router-dom";
import { categoriesActions } from "../../store/categories-slices";
import SignIn from "../SignIn/SignIn";

const Footer = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const categories = useAppSelector((state) => state.categories);
  const isLoggedIn = useAppSelector((state) => state.user.result);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoToAccount = () => {
    if (isLoggedIn._id) {
      navigate(`/users/${isLoggedIn._id}`);
    } else {
      setOpenPopup(!openPopup);
    }
  };

  return (
    <footer className='section__padding'>
      <div className='footer__container'>
        <div>
          <h5>SHOP</h5>
          <ul>
            {categories.categories.map((category) => {
              return (
                <Link
                  to={"/"}
                  key={category._id}
                  className='link footer__container-category'
                  onClick={() =>
                    dispatch(
                      categoriesActions.pickedCategory(category.category_name)
                    )
                  }>
                  {category.category_name}
                </Link>
              );
            })}
          </ul>
        </div>
        <div>
          <h5>CORPORATE INFO</h5>
          <ul>
            <li>Career at E.com</li>
            <li>About E.com group</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h5>HELP</h5>
          <ul>
            <li>Customer Service</li>
            <li onClick={() => handleGoToAccount()}>My account</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <ul className='footer-social link'>
        <li>
          <a
            href='https://en-gb.facebook.com/'
            target='_blank'
            rel='noreferrer'
            className='link'>
            <BsFacebook size={18} />
          </a>
        </li>
        <li>
          <a
            href='https://twitter.com/login'
            target='_blank'
            rel='noreferrer'
            className='link'>
            <BsTwitter size={18} />
          </a>
        </li>
        <li>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer'
            className='link'>
            <BsInstagram size={18} />
          </a>
        </li>
        <li>
          <a
            href='https://www.youtube.com/'
            target='_blank'
            rel='noreferrer'
            className='link'>
            <BsYoutube size={18} />
          </a>
        </li>
      </ul>
      {openPopup && !isLoggedIn._id && (
        <SignIn togglePopup={handleGoToAccount} />
      )}
    </footer>
  );
};

export default Footer;

import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import "./footer.css";

const Footer = () => {
  const categories = useAppSelector((state) => state.categories);
  return (
    <footer className='footer section__padding'>
      <span className='footer__container'>
        <div>
          <h5>SHOP</h5>
          <div>
            {categories.categories.map((category) => {
              return <p key={category._id}>{category.category_name}</p>;
            })}
          </div>
        </div>
        <div>
          <h5>CORPORATE INFO</h5>
          <div>
            <p>Career at E.com</p>
            <p>About E.com group</p>
            <p>Press</p>
          </div>
        </div>
        <div>
          <h5>HELP</h5>
          <div>
            <p>Customer Service</p>
            <p>My account</p>
            <p>Contact</p>
          </div>
        </div>
        <div>
          <h5>JOIN NOW</h5>

          <div>Become a member today</div>
        </div>
      </span>
      <div className='footer__container footer-social'>
        <p>facebook</p>
        <p>twitter</p>
        <p>instagram</p>
        <p>youtube</p>
        <p>pinterest</p>
      </div>
    </footer>
  );
};

export default Footer;

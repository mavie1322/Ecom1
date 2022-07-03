import React from "react";
import "./signInSubmenu.css";

import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";

const SignInSubmenu = () => {
  const user = useAppSelector((state) => state.user.result);
  return (
    <div className='sign-submenu_container'>
      <Link to={`/users/${user._id}`} className='link sign-submenu_link'>
        My Account
      </Link>
      <p>Sign out</p>
    </div>
  );
};

export default SignInSubmenu;

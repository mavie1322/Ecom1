import React from "react";
import "./signInSubmenu.css";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { userActions } from "../../../store/user-slices";

const SignInSubmenu = () => {
  const user = useAppSelector((state) => state.user.result);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(userActions.resetUser());
    navigate("/");
  };

  return (
    <div className='sign-submenu_container'>
      <Link to={`/users/${user._id}`} className='link sign-submenu_link'>
        My Account
      </Link>
      <p onClick={() => handleSignOut()}>Sign out</p>
    </div>
  );
};

export default SignInSubmenu;

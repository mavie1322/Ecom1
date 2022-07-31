import React from "react";
import ProfileAccount from "../../containers/ProfileAccount";
import "./settings.css";

const Settings = () => {
  return (
    <div className='profile section__margin'>
      <ProfileAccount />
      <div className='profile__summary'>Settings</div>
    </div>
  );
};

export default Settings;

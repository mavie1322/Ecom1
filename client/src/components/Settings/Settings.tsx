import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProfileAccount from "../../containers/ProfileAccount";
import { useAppSelector } from "../../hooks/hooks";
import DetailsForm from "./DetailsForm";
import "./settings.css";

const Settings = () => {
  const user = useAppSelector((state) => state.user.result);
  const [editUserInfo, setEditUserInfo] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className='profile section__margin'>
      <ProfileAccount />
      <div className='profile__summary settings__container'>
        <h1>Settings</h1>
        <section>
          <span className='settings__container-span'>
            <h4>My details</h4>
            <p onClick={() => setEditUserInfo(!editUserInfo)}>
              {editUserInfo ? <AiOutlineClose /> : "Edit"}
            </p>
          </span>
          {editUserInfo ? (
            <div className='settings__container-form'>
              <DetailsForm
                setEditUserInfo={setEditUserInfo}
                editUserInfo={editUserInfo}
              />
            </div>
          ) : (
            <div className='settings__container-details__main'>
              <div>
                <p>Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p>First Name</p>
                <p>{user.first_name}</p>
              </div>
              <div>
                <p>Last Name</p>
                <p>{user.last_name}</p>
              </div>
              <div>
                <p>Postcode</p>
                <p>{user.address.postcode}</p>
              </div>
              <div>
                <p>Country</p>
                <p>{user.address.country}</p>
              </div>
            </div>
          )}
        </section>
        <section>
          <span className='settings__container-span'>
            <h4>Address book</h4>
            <p
              onClick={() =>
                navigate(`/users/${user._id}/settings/addressbook`)
              }>
              Edit
            </p>
          </span>
          {user.address.street_address === "" ? (
            <div className='settings__container-info'>
              <p>You can also add and edit delivery address here.</p>
              <p>No home address saved.</p>
            </div>
          ) : (
            <div className='settings__container-address'>
              <h6>Billing Address</h6>
              <div>
                <p>{user.address.flat_number}</p>
                <p>{user.address.street_address}</p>
                <p>{`${user.address.postcode} ${user.address.city}`}</p>
                <p>{user.address.country}</p>
              </div>
            </div>
          )}
        </section>
        <section>
          <span>
            <h4>Privacy</h4>
          </span>
          <div className='settings__container-privacy'>
            <p
              onClick={() =>
                navigate(`/users/${user._id}/settings/change-password`)
              }>
              Change password
            </p>
            <p>Delete account</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;

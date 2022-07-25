import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { FiSettings } from "react-icons/fi";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProfileAccount = () => {
  const user = useAppSelector((state) => state.user.result);
  const navigate = useNavigate();

  const handleAllPurchases = () => {
    navigate(`/users/${user._id}`);
  };

  const handleInviteFriends = () => {
    navigate(`/users/${user._id}/invite`);
  };

  return (
    <div className='profile__account'>
      <div>
        <span className='profile__account-span'>
          <p>
            Hi <strong>{`${user.first_name} ${user.last_name}`}</strong>
          </p>
          <FiSettings className='profile__account-span__icon' />
        </span>
        <img
          src={`https://avatars.dicebear.com/api/initials/${user.first_name}${user.last_name}.svg`}
          alt={`${user.first_name} avatar`}
        />
      </div>
      <div className='profile__account-div'>
        <p className='profile__account-div__title'>My Account</p>
        <span onClick={() => handleAllPurchases()}>
          <p>My Orders</p>
          <AiOutlineRight />
        </span>
        <span onClick={() => handleInviteFriends()}>
          <p>Invite a friend</p>
          <AiOutlineRight />
        </span>
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default ProfileAccount;

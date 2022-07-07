import React, { useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { AiOutlineRight } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import "./profile.css";
import Orders from "../Orders/Orders";
import InviteFriends from "../InviteFriends/InviteFriends";

const Profile = () => {
  const user = useAppSelector((state) => state.user.result);
  const [showOrders, setShowOrders] = useState<boolean>(true);
  const [isInvitingFriends, setIsInvitingFriends] = useState<boolean>(false);

  const handleAllPurchases = () => {
    setShowOrders(true);
    setIsInvitingFriends(false);
  };

  const handleInviteFriends = () => {
    setIsInvitingFriends(true);
    setShowOrders(false);
  };
  console.log(user);
  return (
    <div className='profile section__margin'>
      <div className='profile__account'>
        <div>
          <span className='profile__account-span'>
            <p>Hi {`${user.first_name} ${user.last_name}`}</p>
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
            <p>All Purchases</p>
            <AiOutlineRight />
          </span>
          <span onClick={() => handleInviteFriends()}>
            <p>Invite a friend</p>
            <AiOutlineRight />
          </span>
          <p>Sign out</p>
        </div>
      </div>
      <div className='profile__summary'>
        {showOrders ? (
          <Orders />
        ) : isInvitingFriends ? (
          <InviteFriends />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;

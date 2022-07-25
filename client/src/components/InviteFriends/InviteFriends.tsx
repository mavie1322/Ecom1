import ProfileAccount from "../../containers/ProfileAccount";
import "./inviteFriends.css";

const InviteFriends = () => {
  return (
    <div className='profile section__margin'>
      <ProfileAccount />
      <div className='profile__summary inviteFriend__container'>
        <h1>Invite your friend</h1>
        <div className='inviteFriend__container-div'>
          <p>Let them in all the perks!</p>
          <p>
            Invite your friends to become members and you'll be rewarded with
            10% reduction! How amazing is that?
          </p>
        </div>
        <div className='inviteFriend__container__work'>
          <h3>How invites work</h3>
          <p>
            Every time a new friend signs up via your invite, you'll get 10%
            discount when they complete their first purchase
          </p>
        </div>
        <button className=' font-styling'>Invite now</button>
      </div>
    </div>
  );
};

export default InviteFriends;

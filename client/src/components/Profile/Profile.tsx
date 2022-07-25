import "./profile.css";
import Orders from "../Orders/Orders";
import ProfileAccount from "../../containers/ProfileAccount";

const Profile = () => {
  return (
    <div className='profile section__margin'>
      <ProfileAccount />
      <div className='profile__summary'>
        <Orders />
      </div>
    </div>
  );
};

export default Profile;

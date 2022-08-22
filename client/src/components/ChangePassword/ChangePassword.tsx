import { useState } from "react";
import Input from "../../containers/Input";
import ProfileAccount from "../../containers/ProfileAccount";
import { Passwords } from "../../models";
import "./changePassword.css";

const ChangePassword = () => {
  const [password, setPassword] = useState<Passwords>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  return (
    <div className='profile section__margin'>
      <ProfileAccount />
      <div className='profile__summary password__container'>
        <h1>Change password</h1>
        <section>
          <h4>Change password</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              label={"Current password"}
              isRequired={true}
              name={"oldPassword"}
              type={"password"}
              value={password.oldPassword}
              change={handleChange}
              focus={true}
              read={false}
              style={{}}
            />
            <Input
              label={"New password"}
              isRequired={true}
              name={"newPassword"}
              type={"password"}
              value={password.newPassword}
              change={handleChange}
              focus={true}
              read={false}
              style={{}}
            />
            <Input
              label={"Confirm new password"}
              isRequired={true}
              name={"confirmPassword"}
              type={"password"}
              value={password.confirmPassword}
              change={handleChange}
              focus={true}
              read={false}
              style={{}}
            />
            <div>
              <button type='submit'>Change password</button>
              <button type='submit'>Cancel</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;

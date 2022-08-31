import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../actions/user-actions";
import Input from "../../containers/Input";
import ProfileAccount from "../../containers/ProfileAccount";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Passwords } from "../../models";
import { errorsActions } from "../../store/errors-slices";
import "./changePassword.css";

const ChangePassword = () => {
  const user = useAppSelector((state) => state.user.result);
  const error = useAppSelector((state) => state.errors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<Passwords>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(errorsActions.errorCurrentPasswordIncorrect(false));
    dispatch(errorsActions.errorPasswordUnmatched(false));
    dispatch(changePassword(password, user._id, navigate));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };
  // console.log(password);
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
              style={
                error.currentPasswordError ? { border: "2px solid red" } : {}
              }
            />
            {error.currentPasswordError && (
              <p className='password__error'>Current password is incorrect.</p>
            )}
            <Input
              label={"New password"}
              isRequired={true}
              name={"newPassword"}
              type={"password"}
              value={password.newPassword}
              change={handleChange}
              focus={true}
              read={false}
              style={error.passwordUnmatched ? { border: "2px solid red" } : {}}
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
              style={error.passwordUnmatched ? { border: "2px solid red" } : {}}
            />
            {error.passwordUnmatched && (
              <p className='password__error'>Passwords do NOT match.</p>
            )}

            <div className='password__buttons'>
              <button type='submit' className='black'>
                Change password
              </button>
              <button
                type='button'
                className='white'
                onClick={() => navigate(`/users/${user._id}/settings`)}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;

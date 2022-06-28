import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { UserDetails } from "../../models";
import { errorsActions } from "../../store/errors-slices";
import { signIn, signUp } from "../../actions/user-actions";
import "./signIn.css";

interface Props {
  togglePopup: () => void;
}

const SignIn: React.FC<Props> = ({ togglePopup }) => {
  const isAccountCreated = useAppSelector(
    (state) => state.errors.user_creation
  );
  const isUserNotLoggedIn = useAppSelector((state) => state.errors.not_login);
  const [member, setMember] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (member) {
      dispatch(signUp(userDetails));
      setUserDetails({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
    } else {
      dispatch(signIn(userDetails, togglePopup, setUserDetails));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleSwitch = () => {
    setMember((previousState) => !previousState);
    setUserDetails({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    dispatch(errorsActions.errorUserCreation(""));
    dispatch(errorsActions.errorUserLoggedIn(false));
  };

  return (
    <div className='popup-box'>
      <div className='box scale-up-ver-bottom'>
        <span className='close-icon' onClick={() => togglePopup()}>
          X
        </span>
        {
          <div className='sign-in'>
            {/* switch title either you are signing in or up */}
            {member ? (
              <header className='sign-in__header font-styling'>
                Become a member
              </header>
            ) : (
              <header className='sign-in__header font-styling'>Sign in</header>
            )}
            {/* error messages */}
            {isAccountCreated === "true" ? (
              <p className='successful-message'>
                Your account has been successfully created
              </p>
            ) : isAccountCreated === "false" ? (
              <p className='error-message'>The account already exists</p>
            ) : (
              <></>
            )}

            {isUserNotLoggedIn && (
              <p className='error-message'>
                Your email and password are invalid
              </p>
            )}

            <form onSubmit={(e) => handleSubmit(e)}>
              {/* create first and last name input to sign up */}
              {member && (
                <>
                  <div className='sign-in__inputs'>
                    <span>
                      <label>First name</label>
                    </span>
                    <input
                      required
                      name='first_name'
                      type='text'
                      value={userDetails.first_name}
                      onChange={(e) => handleChange(e)}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                  <div className='sign-in__inputs'>
                    <span>
                      <label>Last name</label>
                    </span>
                    <input
                      required
                      name='last_name'
                      type='text'
                      value={userDetails.last_name}
                      onChange={(e) => handleChange(e)}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </>
              )}
              <div className='sign-in__inputs'>
                <span>
                  <label>Email</label>
                  <p>*</p>
                </span>
                <input
                  type='text'
                  required
                  name='email'
                  value={userDetails.email}
                  onChange={(e) => handleChange(e)}
                  style={member ? { backgroundColor: "white" } : {}}
                />
              </div>
              <div className='sign-in__inputs'>
                {/* switch input title either you are signing in or up */}
                {member ? (
                  <span>
                    <label>Create a password</label>
                    <p>*</p>
                  </span>
                ) : (
                  <span>
                    <label>Password</label>
                    <p>*</p>
                  </span>
                )}
                {/* background color white when signing up */}
                <input
                  required
                  name='password'
                  value={userDetails.password}
                  onChange={(e) => handleChange(e)}
                  style={member ? { backgroundColor: "white" } : {}}
                  type='password'
                />
              </div>
              {/*decide which buttons to appear either on the sign in or sign up pop up window */}
              {member ? (
                <>
                  <div className='sign-in__buttons'>
                    <button
                      type='submit'
                      className='sign-in__become-member font-styling'
                      style={
                        member
                          ? {
                              backgroundColor: "black",
                              color: "white",
                              marginTop: "3rem",
                            }
                          : {}
                      }>
                      Become a member
                    </button>
                    <span onClick={() => handleSwitch()}>Back to sign in</span>
                  </div>
                </>
              ) : (
                //resetting the password will be possible when you sign in
                // sign in and become member buttons will appear when you are on the sign in popup
                <>
                  {" "}
                  <div className='sign-in__option'>
                    <span>Forgot password?</span>
                  </div>
                  <div className='sign-in__buttons'>
                    <button
                      type='submit'
                      className='sign-in__button font-styling'>
                      Sign In
                    </button>
                  </div>
                  <div className='sign-in__buttons'>
                    <button
                      type='button'
                      className='sign-in__become-member font-styling'
                      onClick={() => handleSwitch()}>
                      Become a member
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        }
      </div>
    </div>
  );
};

export default SignIn;

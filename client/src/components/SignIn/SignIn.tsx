import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { postUser } from "../../services/api";
import { fetchUsername } from "../../store/user-actions";
import "./signIn.css";

interface Props {
  togglePopup: () => void;
}

const SignIn: React.FC<Props> = ({ togglePopup }) => {
  const [member, setMember] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(fetchUsername(username));
    } catch (err) {
      console.log("change color");
    }

    togglePopup();
  };

  const handleMemberSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postUser({ username: username });
    setUsername("");
    setMember(false);
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

            <form
              onSubmit={(e) => {
                if (member) return handleMemberSubmit(e);
                return handleSignInSubmit(e);
              }}>
              {/* create first and last name input */}
              {member && (
                <>
                  <div className='sign-in__inputs'>
                    <span>
                      <label>First name</label>
                    </span>
                    <input type='text' style={{ backgroundColor: "white" }} />
                  </div>
                  <div className='sign-in__inputs'>
                    <span>
                      <label>Last name</label>
                    </span>
                    <input type='text' style={{ backgroundColor: "white" }} />
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
                  // required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  // required
                  style={member ? { backgroundColor: "white" } : {}}
                  type='password'
                />
              </div>
              {/*decide which buttons to appear either on the sign in or sign up pop up window */}
              {member ? (
                //only the become member button will appear on the sign up pop up
                <>
                  <div className='sign-in__buttons'>
                    <button
                      type='submit'
                      className='sign-in__become-member font-styling'
                      // adding style to the button when user is on become member pop up
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
                    <span onClick={() => setMember(false)}>
                      Back to sign in
                    </span>
                  </div>
                </>
              ) : (
                //resetting the password will be possible when you sign up
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
                      onClick={() => setMember(true)}>
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

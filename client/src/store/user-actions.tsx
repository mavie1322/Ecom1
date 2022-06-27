import { UserDetails, User } from "../models";
import { createUser, logInUser } from "../services/api";
import { errorsActions } from "./errors-slices";
import { userActions } from "./user-slices";

export const signIn = (
  userDetails: UserDetails,
  togglePopup: () => void,
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>
) => {
  return async (dispatch: any) => {
    try {
      const userProfile: User = await logInUser(userDetails);
      dispatch(userActions.storeUser(userProfile));
      togglePopup();
      setUserDetails({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      dispatch(errorsActions.errorUserLoggedIn(false));
    } catch (err: any) {
      dispatch(errorsActions.errorUserLoggedIn(true));
    }
  };
};

export const signUp = (userDetails: UserDetails) => {
  return async (dispatch: any) => {
    try {
      const userProfile: User = await createUser(userDetails);
      if (userProfile) dispatch(errorsActions.errorUserCreation("true"));
    } catch (error: any) {
      if (error.response.data.message === "User already exists.")
        dispatch(errorsActions.errorUserCreation("false"));
    }
  };
};

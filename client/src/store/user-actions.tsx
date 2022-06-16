import { UsernameProfile } from "../models";
import { getUserByUsername } from "../services/api";
import { userActions } from "./user-slices";

export const fetchUsername = (username: string) => {
  return async (dispatch: any) => {
    try {
      const usernameProfile: UsernameProfile = await getUserByUsername(
        username
      );
      dispatch(userActions.storeUser(usernameProfile));
    } catch (err: any) {
      console.log("in reduux");
    }
  };
};

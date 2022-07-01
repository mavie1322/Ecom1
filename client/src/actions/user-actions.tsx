import { UserDetails, User, BasketItem } from "../models";
import {
  addItemsToBasket,
  createUser,
  deleteItemInBasket,
  logInUser,
} from "../services/api";
import { errorsActions } from "../store/errors-slices";
import { userActions } from "../store/user-slices";

export const signIn = (
  userDetails: UserDetails,
  togglePopup: () => void,
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>
) => {
  return async (dispatch: any) => {
    try {
      const userProfile: User = await logInUser(userDetails);
      console.log(userProfile);
      dispatch(userActions.storeUser(userProfile));
      togglePopup();
      setUserDetails({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        basket: [],
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

export const addToBasketApi = (items: BasketItem[], id: string) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile: User = await addItemsToBasket(items, id);
      dispatch(userActions.updateBasket(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteItemApi = (itemId: string, userId: string) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile: User = await deleteItemInBasket(
        { id: itemId },
        userId
      );
      console.log(newUserProfile);
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeItemQuantity = (
  itemQuantity: [number, string],
  userId: string
) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile = await changeItemQuantity(itemQuantity, userId);
      console.log(newUserProfile);
    } catch (error) {
      console.log(error);
    }
  };
};

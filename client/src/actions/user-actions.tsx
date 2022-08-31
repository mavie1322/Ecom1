import { Params, useNavigate } from "react-router-dom";
import {
  UserDetails,
  User,
  BasketItem,
  Address,
  AddressDelivery,
  UserInfo,
  Passwords,
} from "../models";
import {
  addItemToBasketApi,
  changeItemQuantityApi,
  createUser,
  deleteItemInBasketApi,
  editBillingAddressApi,
  editDeliveryAddressApi,
  logInUser,
  getUserDetails,
  deleteDeliveryAddressApi,
  editUserInformationApi,
  changePasswordApi,
  deleteUserApi,
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

export const getUser = (id: Readonly<Params<string>>) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile = await getUserDetails(id);
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
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

export const addItemToBasket = (item: BasketItem, id: string) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile: User = await addItemToBasketApi({ item }, id);
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteItem = (itemId: string, userId: string) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile: User = await deleteItemInBasketApi(
        { id: itemId },
        userId
      );

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
      const newUserProfile = await changeItemQuantityApi(
        { itemQuantity },
        userId
      );
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editBillingAddress = (billingAddress: Address, userId: string) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile = await editBillingAddressApi(
        { billingAddress },
        userId
      );
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editDeliveryAddress = (
  deliveryAddress: AddressDelivery,
  userId: string
) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile = await editDeliveryAddressApi(
        { deliveryAddress },
        userId
      );
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteDeliveryAddress = (userId: string) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile = await deleteDeliveryAddressApi(userId);
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editUserDetails = (userInformation: UserInfo, userId: string) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile = await editUserInformationApi(
        { userInformation },
        userId
      );
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changePassword = (
  passwordEntries: Passwords,
  userId: string,
  navigate: any
) => {
  return async (dispatch: any) => {
    try {
      const newUserProfile = await changePasswordApi(
        { passwordEntries },
        userId
      );
      navigate(`/users/${userId}/settings`);
      dispatch(userActions.storeUser(newUserProfile));
    } catch (error: any) {
      let errorMessage = error.response.data.message;
      //if current password is incorrect, dispatch action to display error message
      if (errorMessage === "Current password is incorrect") {
        dispatch(errorsActions.errorCurrentPasswordIncorrect(true));
      }
      //if new passwords are not identical, dispatch action to display error message
      else if (errorMessage === "Passwords don't match") {
        dispatch(errorsActions.errorPasswordUnmatched(true));
      }
    }
  };
};

export const deleteUser = (userId: string, navigate: any) => {
  return async (dispatch: any) => {
    try {
      const deletedUser = await deleteUserApi(userId);
      if (deletedUser.message === "User deleted") {
        dispatch(userActions.resetUser());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

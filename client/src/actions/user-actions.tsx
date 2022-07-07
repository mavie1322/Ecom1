import {
  UserDetails,
  User,
  BasketItem,
  Address,
  AddressDelivery,
} from "../models";
import {
  addItemToBasketApi,
  changeItemQuantityApi,
  createUser,
  deleteItemInBasketApi,
  editBillingAddressApi,
  editDeliveryAddressApi,
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

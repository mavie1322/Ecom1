import axios from "axios";
import { Params } from "react-router-dom";
import {
  Address,
  AddressDelivery,
  BasketItem,
  Passwords,
  UserDetails,
  UserInfo,
} from "../models";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers!.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")!).token
    }`;
  }
  return req;
});

export const getItems = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

export const getItemById = async (id: string) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

export const logInUser = async (body: UserDetails) => {
  const res = await API.post("/users/signin", body);
  return res.data;
};

export const createUser = async (body: UserDetails) => {
  const res = await API.post("/users/signup", body);
  return res.data;
};

export const addItemToBasketApi = async (
  body: { item: BasketItem },
  id: string
) => {
  const res = await API.patch(`/users/${id}/basket`, body);
  return res.data;
};

export const deleteItemInBasketApi = async (
  body: { id: string },
  userId: string
) => {
  const res = await API.patch(`/users/${userId}/basket`, body);
  return res.data;
};

export const changeItemQuantityApi = async (
  body: { itemQuantity: [number, string] },
  userId: string
) => {
  const res = await API.patch(`/users/${userId}/basket`, body);
  return res.data;
};

export const editBillingAddressApi = async (
  body: { billingAddress: Address },
  userId: string
) => {
  const res = await API.patch(`/users/${userId}/checkout`, body);
  return res.data;
};

export const editDeliveryAddressApi = async (
  body: { deliveryAddress: AddressDelivery },
  userId: string
) => {
  const res = await API.patch(`/users/${userId}/checkout`, body);
  return res.data;
};

export const payWithStripe = async (body: {
  basketItems: BasketItem[];
  userId: string;
}) => {
  const res = await API.post("/stripe/create-checkout-session", body);
  return res.data;
};

export const getUserDetails = async (userId: Readonly<Params<string>>) => {
  const res = await API.get(`/users/${userId.id}`);
  return res.data;
};

export const fetchOrdersByUser = async (body: { orders: string[] }) => {
  const res = await API.patch("/orders/", body);
  return res.data;
};

export const deleteDeliveryAddressApi = async (userId: string) => {
  const res = await API.delete(`/users/${userId}/settings`);
  return res.data;
};

export const editUserInformationApi = async (
  body: { userInformation: UserInfo },
  userId: string
) => {
  const res = await API.patch(`/users/${userId}/settings`, body);
  return res.data;
};

export const changePasswordApi = async (
  body: { passwordEntries: Passwords },
  userId: string
) => {
  const res = await API.patch(`/users/${userId}/settings`, body);
  return res.data;
};

export const deleteUserApi = async (userId: string) => {
  const res = await API.delete(`/users/${userId}`);
  return res.data;
};

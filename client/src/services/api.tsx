import axios from "axios";
import { UserDetails } from "../models";

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

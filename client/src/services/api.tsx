import axios from "axios";

const marketApi = axios.create({
  baseURL: "https://nc-marketplace.herokuapp.com/api",
});

export const getItems = async () => {
  const res = await marketApi.get("/items");
  return res.data;
};

export const getCategories = async () => {
  const res = await marketApi.get("/categories");
  return res.data;
};

export const getItemById = async (id: string) => {
  const res = await marketApi.get(`/items/${id}`);
  return res.data;
};

export const getUserByUsername = async (username: string) => {
  const res = await marketApi.get(`/users/${username}`);
  return res.data.user;
};

export const postUser = async (body: { username: string }) => {
  const res = await marketApi.post("/users", body);
  return res.data;
};

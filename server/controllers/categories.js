import mongoose from "mongoose";
import CategoriesMessage from "../models/categoriesMessage.js";

export const getCategories = async (req, res) => {
  try {
    const categoriesMessage = await CategoriesMessage.find();
    res.status(200).send(categoriesMessage);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

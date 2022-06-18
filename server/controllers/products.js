import mongoose from "mongoose";
import ProductsMessage from "../models/productsMessage.js";

export const getProducts = async (req, res) => {
  try {
    const productMessage = await ProductsMessage.find();
    res.status(200).send(productMessage);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

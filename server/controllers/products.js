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

export const getSingleProduct = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params);
  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).send("No product with that id");
  const productFound = await ProductsMessage.findById(_id);
  console.log(productFound);
  res.status(200).send(productFound);
};

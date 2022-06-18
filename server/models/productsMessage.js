import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  item_name: String,
  description: String,
  img_url: String,
  price: Number,
  category_name: String,
});

const ProductsMessage = mongoose.model("products", productSchema);

export default ProductsMessage;

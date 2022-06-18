import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category_name: String,
});

const CategoriesMessage = mongoose.model("categories", categorySchema);

export default CategoriesMessage;

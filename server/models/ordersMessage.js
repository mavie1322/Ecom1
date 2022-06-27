import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema({
  items: [
    {
      item_basket: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity_ordered: { type: Number },
    },
  ],
  total_cost: Number,
  createdAt: { type: Date, default: new Date() },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  delivery_cost: Boolean,
});

const OrdersMessage = mongoose.model("orders", orderSchema);

export default OrdersMessage;

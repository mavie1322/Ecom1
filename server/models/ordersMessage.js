import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  products: [
    {
      item: {
        type: String,
      },
      qty: { type: Number },
    },
  ],

  createdAt: { type: Date, default: new Date() },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  paymentIntentId: { type: String },
  stripeCustomerId: { type: String },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  shipping: { type: Object, required: true },
  delivery_status: { type: String, default: "pending" },
  payment_status: { type: String, required: true },
});

const OrdersMessage = mongoose.model("orders", orderSchema);

export default OrdersMessage;

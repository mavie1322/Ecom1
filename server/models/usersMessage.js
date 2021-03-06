import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    street_address: String,
    flat_number: String,
    city: String,
    postcode: String,
    country: String,
  },
  delivery_address: {
    first_name: String,
    last_name: String,
    street_address: String,
    flat_number: String,
    city: String,
    postcode: String,
    country: String,
  },
  basket: {
    type: Array,
    default: [],
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "orders",
  },
});

const UsersMessage = mongoose.model("users", userSchema);

export default UsersMessage;

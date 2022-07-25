import OrdersMessage from "../models/ordersMessage.js";

export const getOrders = async (req, res) => {
  console.log(">>>", req.body.orders);
  const orders = req.body.orders;
  try {
    const result = await OrdersMessage.find({ _id: { $in: orders } });
    const reversedOrders = result.reverse();
    res.status(200).send({ orders: reversedOrders });
  } catch (error) {
    console.log(error);
  }
};

import Stripe from "stripe";
import dotenv from "dotenv";
import express from "express";
import Users from "../models/usersMessage.js";
import Order from "../models/ordersMessage.js";

const router = express.Router();
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = process.env.LOCALHOST;

router.post("/create-checkout-session", async (req, res) => {
  //compress the basket because stripe customer metadata need to be a string of max 500 characters
  const newBasket = req.body.basketItems.map((item) => {
    return {
      item: item.item_basket._id,
      qty: item.quantity_ordered,
    };
  });
  //create stripe customer
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      basket: JSON.stringify(newBasket),
    },
  });

  const line_items = req.body.basketItems.map((item) => {
    const { item_basket, quantity_ordered } = item;
    const { _id, item_name, price, img_url } = item_basket;
    return {
      price_data: {
        currency: "gbp",
        product_data: {
          name: item_name,
          images: [img_url],
          metadata: {
            id: _id,
          },
        },
        unit_amount: price,
      },
      quantity: quantity_ordered,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_address_collection: {
    //   allowed_countries: ["GB"],
    // },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 399,
            currency: "gbp",
          },
          display_name: "Standard shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
    ],
    customer: customer.id,
    line_items,
    mode: "payment",

    success_url: `${YOUR_DOMAIN}/users/${req.body.userId}/checkout-success`,
    cancel_url: `${YOUR_DOMAIN}/users/${req.body.userId}/basket`,
  });

  res.send({ url: session.url });
});
//Create Order
const createOrder = async (customer, data) => {
  // console.log("customer >>>", customer);
  const items = JSON.parse(customer.metadata.basket);
  const id = customer.metadata.userId;
  // console.log("items >>>>", items);
  const user = await Users.findOne({ id });
  const newOrder = new Order({
    userId: id,
    stripeCustomerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: user.delivery_address,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    // console.log("processed order >>>>", savedOrder);
    user.basket = [];
    user.orders.push(savedOrder._id);
    const updatedUser = await Users.findByIdAndUpdate(id, user, { new: true });
    console.log("user >>>>", updatedUser);
    //send email with order
  } catch (error) {
    console.log(error);
  }
};
//Stripe Webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_b0059f4968981ffb56d0d71958684d470e1627d49d4fb90e610f1cc10fe8acb9";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    // const sig = request.headers["stripe-signature"];
    let data;
    let eventType;

    const payload = request.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          payloadString,
          header,
          endpointSecret
        );
        data = event.data.object;
        eventType = event.type;
      } catch (err) {
        console.log(`webhook message: ${error.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
        })
        .catch((error) => console.log(error.message));
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

export default router;

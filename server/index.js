import express from "express";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import Stripe from "stripe";

import ProductsRoutes from "./routes/products.js";
import CategoriesRoutes from "./routes/categories.js";
import UsersRoutes from "./routes/users.js";
import StripeRoutes from "./routes/stripes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/products", ProductsRoutes);
app.use("/categories", CategoriesRoutes);
app.use("/users", UsersRoutes);
app.use("/stripe", StripeRoutes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`server running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

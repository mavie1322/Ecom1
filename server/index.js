import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import ProductRoutes from "./routes/products.js";
import CategoriesRoutes from "./routes/categories.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/products", ProductRoutes);
app.use("/categories", CategoriesRoutes);

// const CONNECTION_URL =
//   "mongodb+srv://Orchestrate:Nctcch22@caffeineo1.8izcc.mongodb.net/Ecom?retryWrites=true&w=majority";
// const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`server running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

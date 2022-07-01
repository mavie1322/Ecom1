import express from "express";
import {
  signInUser,
  signUpUser,
  addToBasket,
  deleteProduct,
  updateBasket,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signin/", signInUser);
router.post("/signup", signUpUser);

router.post("/:id/basket", auth, addToBasket);
router.patch("/:id/basket", auth, updateBasket);

export default router;

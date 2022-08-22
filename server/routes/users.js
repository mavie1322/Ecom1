import express from "express";
import {
  signInUser,
  signUpUser,
  updateBasket,
  editAddresses,
  getUserById,
  deleteDeliveryAddress,
  editUserInformation,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signInUser);
router.post("/signup", signUpUser);
router.patch("/:id/basket", auth, updateBasket);
router.patch("/:id/checkout", auth, editAddresses);
router.delete("/:id/settings", auth, deleteDeliveryAddress);
router.patch("/:id/settings", auth, editUserInformation);
router.get("/:id/", getUserById);

export default router;

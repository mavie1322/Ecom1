import express from "express";
import { getOrders } from "../controllers/orders.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.patch("/", auth, getOrders);

export default router;

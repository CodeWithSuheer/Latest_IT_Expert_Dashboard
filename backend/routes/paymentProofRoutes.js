import express from "express";
import { getAllPaymentProofs } from "../controllers/paymentProofController.js";

const paymentProofRouter = express.Router();

paymentProofRouter.post("/getAllPaymentProofs",getAllPaymentProofs);

export default paymentProofRouter;
import express from "express";
import { getAllPaymentProofs, updatePaymentProofStatus } from "../controllers/paymentProofController.js";

const paymentProofRouter = express.Router();

paymentProofRouter.post("/getAllPaymentProofs",getAllPaymentProofs);
paymentProofRouter.post("/updatePaymentProofStatus",updatePaymentProofStatus);

export default paymentProofRouter;


import { PaymentProof } from "../models/paymentProofModel.js";

export const getAllPaymentProofs = async (req, res, next) => {
  try {
     const data = await PaymentProof.find().sort({ createdAt :  -1 })
    return res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

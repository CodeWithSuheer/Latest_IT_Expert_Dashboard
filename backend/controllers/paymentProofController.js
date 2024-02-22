

import { PaymentProof } from "../models/paymentProofModel.js";

export const getAllPaymentProofs = async (req, res, next) => {
  try {
     const data = await PaymentProof.find().sort({ createdAt : -1 })
    return res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePaymentProofStatus = async (req,res,next) => {
    try {
        const {id,status} =  req.body;
      const data =   await PaymentProof.findByIdAndUpdate(id, { status: status });
        res.status(201).json({msg:"success" , data});
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
}
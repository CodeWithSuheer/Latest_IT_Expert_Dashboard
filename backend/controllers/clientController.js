import mongoose from "mongoose";
import { Clients } from "../models/clientModel.js";

function setMongoose() {
    return mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, returnValue) => {
        delete returnValue._id;
        delete returnValue.__v;
      },
    });
  }

export const getAllClients = async (req, res, next) => {
    try {
      const allClientsData = await Clients.find({})
      .sort({createdAt: -1})
      setMongoose();
      res.status(200).json(allClientsData);
    } catch (error) {
      res.status(500).json({ msg:error.message});
    }
  };
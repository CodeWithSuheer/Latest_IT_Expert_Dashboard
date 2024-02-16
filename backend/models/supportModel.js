

import mongoose from "mongoose";


const supportSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, "Department Name is required"],
  },
  file: {
    downloadURL: { type: String },
    name: { type: String },
    type: { type: String },
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  ticketNumber:{
    type : String ,
    unique : true,
  },
  customerId:{
    type : String,
    required: [true, "Message is required"],
  },

});

export const Support = mongoose.model("Support", supportSchema);

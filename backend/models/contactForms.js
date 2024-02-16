
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,"Please provide a name"]
  },
  email: {
    type: String,
    required:[true,"Please provide a email"]
  },
  company: {
    type: String,
    required:[true,"Please provide a company"]
  },
  phone: {
    type: String,
    required:[true,"Please provide a phone"]
  },
  message: {
    type: String,
    required:[true,"Please provide a message"]
  },
  refNumber: {
    type: String,
  },
}, {
  timestamps: true, 
});

export const Contacts = mongoose.model('Contacts', schema);




import mongoose from "mongoose";
import { Contacts } from "../models/contactForms.js";

function setMongoose() {
  return mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, returnValue) => {
      delete returnValue._id;
      delete returnValue.__v;
    },
  });
}


export const getAllForms = async (req, res, next) => {
  try {
    const allFormData = await Contacts.find({})
    .sort({createdAt: -1})
    setMongoose();
    res.status(200).json(allFormData);
  } catch (error) {
    res.status(500).json({ msg:error.message});
  }
};

 export const deleteContactForm = async (req, res) => {

  try {
    const {id} = req.body;
    const deletedContact = await Contacts.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.json({ message: 'Contact deleted successfully'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};




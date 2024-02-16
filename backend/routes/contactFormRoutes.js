
import express from "express";
import { deleteContactForm, getAllForms } from "../controllers/contactFormsController.js";

const contactFormRouter = express.Router();

contactFormRouter.post("/getAllForms",getAllForms);
contactFormRouter.post("/deleteContactForm",deleteContactForm)

export default contactFormRouter;

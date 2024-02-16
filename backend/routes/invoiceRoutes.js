
import express from 'express';
import { createInvoice, deleteInvoice, getAllInvoices, updateInvoice } from '../controllers/invoiceController.js';

const invoiceRouter = express.Router();

invoiceRouter.post("/createInvoice",createInvoice);
invoiceRouter.post("/getAllInvoices",getAllInvoices);
invoiceRouter.post("/updateInvoice",updateInvoice);
invoiceRouter.post("/deleteInvoice",deleteInvoice);

export default invoiceRouter;
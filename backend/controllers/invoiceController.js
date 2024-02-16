import mongoose from "mongoose";
import { Invoices, MainDocument } from "../models/invoiceModel.js";
import { sendEmail } from "../assets/nodemailer.js";

function setMongoose() {
  return mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, returnValue) => {
      delete returnValue._id;
      delete returnValue.__v;
    },
  });
}

export const createInvoice = async (req, res, next) => {
  try {
    const invoiceData = req.body;

    if (invoiceData.invoiceType === "half") {
      const invoice1 = new Invoices({
        to: invoiceData.to,
        service: invoiceData.service,
        status: invoiceData.status,
        amount: invoiceData.amount / 2,
        discount: invoiceData.discount,
        customerId: invoiceData.customerId,
        orderId: invoiceData.orderId,
        invoiceType: "half",
        number:invoiceData.number = 1,
        dueDate: invoiceData.dueDate,
        company: invoiceData.company,
      });

      const invoice2 = new Invoices({
        to: invoiceData.to,
        service: invoiceData.service,
        status: invoiceData.status,
        amount: invoiceData.amount / 2,
        discount: invoiceData.discount,
        customerId: invoiceData.customerId,
        orderId: invoiceData.orderId,
        invoiceType: "half",
        number:invoiceData.number = 2,
        secondInvoiceDueDate: invoiceData.secondInvoiceDueDate,
        company: invoiceData.company,
      });

      const mainDocument = new MainDocument({
        to: invoiceData.to,
        customerId: invoiceData.customerId,
        paymentStatus: invoiceData.paymentStatus,
        orderId: invoiceData.orderId,
        invoices: [invoice1, invoice2],
      });
      await sendEmail({email:invoiceData.to.email,emailType:"INVOICEGENERATED",orderId:invoiceData.orderId})
      await mainDocument.save();
    } else {
      const mainDocument = new MainDocument({
        customerId: invoiceData.customerId,
        to: invoiceData.to,
        paymentStatus: invoiceData.paymentStatus,
        orderId: invoiceData.orderId,
        invoices: new Invoices(invoiceData),
      });
      await mainDocument.save();
      await sendEmail({email:invoiceData.to.email,emailType:"INVOICEGENERATED",orderId:invoiceData.orderId})
    }
    res.status(201).json({ msg: "Invoice Generated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllInvoices = async (req, res, next) => {
  try {
    const getAllInvoices = await MainDocument.find({}).sort({ createdAt: -1 });
    setMongoose();
    res.status(200).json(getAllInvoices);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateInvoice = async (req, res, next) => {
  const {
    id,
    invoiceId,
    to,
    service,
    paymentStatus,
    status,
    amount,
    discount,
    customerId,
    orderId,
    dueDate,
    secondInvoiceDueDate,
  } = req.body;
 try {
  let updateQuery = {};
  if (to) {
    updateQuery = { ...updateQuery, to };
  }
  if (service) {
    updateQuery = { ...updateQuery, service };
  }
  if (paymentStatus) {
    updateQuery = { ...updateQuery, paymentStatus };
  }
  if (status) {
    updateQuery = { ...updateQuery, status };
  }
  if (amount) {
    updateQuery = { ...updateQuery, amount };
  }
  if (discount) {
    updateQuery = { ...updateQuery, discount };
  }
  if (amount) {
    updateQuery = { ...updateQuery, amount };
  }
  if (customerId) {
    updateQuery = { ...updateQuery, customerId };
  }
  if (orderId) {
    updateQuery = { ...updateQuery, orderId };
  }
  if (dueDate) {
    updateQuery = { ...updateQuery, dueDate };
  }
  if (secondInvoiceDueDate) {
    updateQuery = { ...updateQuery, secondInvoiceDueDate };
  }

 
  const mainDocument = await MainDocument.findById(id);
  
  if (!mainDocument) {
    return res.status(404).json({ msg: "MainDocument not found" });
  }

    if (invoiceId) {
      const invoiceToUpdate = mainDocument.invoices.find(
        (invoice) => invoice._id.toString() === invoiceId
      );

      if (!invoiceToUpdate) {
        return res.status(404).json({ msg: "Invoice not found" });
      }

      Object.assign(invoiceToUpdate, updateQuery);
      await mainDocument.save();

      Object.assign(mainDocument, updateQuery);
      await mainDocument.save();

      return res.status(200).json({ msg: "Invoice Updated" });
    } else {
      // Update only MainDocument 
      Object.assign(mainDocument, updateQuery);
      await mainDocument.save();
      return res.status(200).json({ msg: "Invoice Updated" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteInvoice = async (req,res,next) => {
  try {
    const {id} = req.body;
    if(!id){
      res.status(404).json({ msg: "Id not Found" });
    }
    await MainDocument.findByIdAndDelete(id);
    res.status(200).json({msg:"Deleted"})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

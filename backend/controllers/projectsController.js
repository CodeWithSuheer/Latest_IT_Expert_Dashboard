import { uploadFileToFirebase } from "../assets/firebase.js";
import { ProjectOrders } from "../models/ProjectOrderModel.js";
import { Projects } from "../models/ProjectsModel.js";
import { Clients } from "../models/clientModel.js";
import { MainDocument } from "../models/invoiceModel.js";

export const createProject = async (req, res) => {
  try {
    const {
      projectTitle,
      companyName,
      startDate,
      Deadline,
      customerId,
      amount,
      projectDescription,
      orderId,
      projectProgress,
      completed,
    } = req.body;

    const paymentStatusData = await MainDocument.findOne({
      orderId: orderId,
    }).exec();
    const verifyOrderId = await ProjectOrders.findOne({
      orderId: orderId,
    }).exec();
    const customerData = await Clients.findOne({
      customerId: customerId,
    }).exec();
    if (!customerData) {
      return res.status(404).json({ msg: "User not Found" });
    }

    if (!paymentStatusData && !verifyOrderId) {
      return res.status(404).json({ msg: "Invalid Order Id" });
    }

    const projectData = await Projects.create({
      projectTitle,
      companyName,
      startDate,
      Deadline,
      customerId,
      orderId,
      amount,
      paymentStatus: paymentStatusData.paymentStatus,
      projectDescription,
      completed,
      projectProgress,
      customerName: customerData.firstName,
      customerEmail: customerData.email,
    });

    return res
      .status(201)
      .json({ msg: "Project created successfully", projectData });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateProjects = async (req, res) => {
  try {
    const {
      id,
      projectTitle,
      companyName,
      startDate,
      Deadline,
      customerId,
      amount,
      projectDescription,
      orderId,
      projectProgress,
      completed,
    } = req.body;

    console.log(id);

    let updateQuery = {};
    if (projectTitle) {
      updateQuery = { ...updateQuery, projectTitle };
    }
    if (startDate) {
      updateQuery = { ...updateQuery, startDate };
    }
    if (Deadline) {
      updateQuery = { ...updateQuery, Deadline };
    }
    if (customerId) {
      const verifyCustomerId = await Clients.findOne({
        customerId: customerId,
      });
      if (!verifyCustomerId) {
        return res.status(404).json({ msg: "User not Found" });
      }

      updateQuery = { ...updateQuery, customerId };
    }
    if (amount) {
      updateQuery = { ...updateQuery, amount };
    }
    if (projectDescription) {
      updateQuery = { ...updateQuery, projectDescription };
    }
    if (orderId) {
      const verifyOrderIdFromInvoices = await MainDocument.findOne({
        orderId: orderId,
      });
      const verifyOrderIdFromProjectOrders = await ProjectOrders.findOne({
        orderId: orderId,
      });

      if (!verifyOrderIdFromInvoices && !verifyOrderIdFromProjectOrders) {
        return res.status(404).json({ msg: "Invalid Order Id" });
      }
      updateQuery = { ...updateQuery, orderId };
    }
    if (projectProgress) {
      updateQuery = { ...updateQuery, projectProgress };
    }
    if (completed) {
      if (completed === undefined) {
        throw new Error("Completed value required ");
      }
      updateQuery = { ...updateQuery, completed };
    }
    if (companyName) {
      updateQuery = { ...updateQuery, companyName };
    }

    if (!id) {
      throw new Error("Id required");
    }

    const file = req.file;
    let fileData = null;

    if (file) {
      const result = await uploadFileToFirebase(file, "Project Files");
      fileData = {
        downloadURL: result.downloadURL,
        name: result.name,
        type: result.type,
      };
      updateQuery = { ...updateQuery, file: fileData };
    }

    await Projects.findByIdAndUpdate(id, updateQuery);
    res.status(200).json({ msg: "Project Updated" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

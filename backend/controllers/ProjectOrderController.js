


import { ProjectOrders } from "../models/ProjectOrderModel.js";
//import { setMongooseid } from "../Helper/MongooseId.js";
import { sendEmail } from "../assets/nodemailer.js";

export const createProjectOrder = async (req, res) => {
  try {
    const {
      projectTitle,
      companyName,
      startDate,
      Deadline,
      customerId,
      orderId,
    } = req.body;

    const logoFile = req.files.find(file => file.fieldname === 'logoFile');
    const attachmentFile = req.files.find(file => file.fieldname === 'attachmentFile');

    let logoFileData = null;
    let attachmentFileData = null;

    if (logoFile) {
      const logoResult = await uploadFileToFirebase(logoFile, "ProjectOrders Files");
      logoFileData = {
        downloadURL: logoResult.downloadURL,
        name: logoResult.name,
        type: logoResult.type,
      };
    }

    if (attachmentFile) {
      const attachmentResult = await uploadFileToFirebase(attachmentFile, "ProjectOrders Files");
      attachmentFileData = {
        downloadURL: attachmentResult.downloadURL,
        name: attachmentResult.name,
        type: attachmentResult.type,
      };
    };

    const project = new ProjectOrders({
      projectTitle,
      companyName,
      startDate,
      Deadline,
      additionalNote,
      customerId,
      orderId,
      logoFile: logoFileData,
      attachmentFile: attachmentFileData,
    });
    await project.save();
    await sendEmail( {email, emailType: "ADDPROJECTORDER" , orderId:project.orderId})
    res
      .status(201)
      .json({
        msg: "ProjectOrders Order Placed Successfully",
        project: project.orderId,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProjectOrders = async (req, res) => {
  try {
    const projects = await ProjectOrders.find().sort({createdAt: -1});
    //setMongooseid();
    res.json({ data: projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectOrders.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "ProjectOrders not found." });
    }
    //setMongooseid();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectTitle, companyName, startDate, Deadline, additionalNote } =
      req.body;

    const project = await ProjectOrders.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "ProjectOrders not found." });
    }

    // Check if files are uploaded
    const logoFile = req.files["logo"][0];
    const attachmentFile = req.files["attachment"][0];

    project.projectTitle = projectTitle || project.projectTitle;
    project.companyName = companyName || project.companyName;
    project.startDate = startDate || project.startDate;
    project.Deadline = Deadline || project.Deadline;
    project.additionalNote = additionalNote || project.additionalNote;
    project.logoFile = logoFile.filename || project.logoFile;
    project.attachmentFile = attachmentFile.filename || project.attachmentFile;

    await project.save();

    res
      .status(201)
      .json({ msg: "ProjectOrders updated successfully", project: project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectOrders.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "ProjectOrders not found." });
    }
    res.json({ message: "ProjectOrders deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

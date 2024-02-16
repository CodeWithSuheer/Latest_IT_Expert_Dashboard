
import express from "express";
import { createProject, getAllProjects, updateProjects } from "../controllers/projectsController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const projectsRouter = express.Router();

projectsRouter.post("/createProject",createProject);
projectsRouter.post("/updateProject",upload.single("filename"),updateProjects);
projectsRouter.post("/getAllProjects",getAllProjects);

export default projectsRouter;
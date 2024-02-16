
import { getAllClients } from "../controllers/clientController.js";
import express from "express";

const clientRouter = express.Router();

clientRouter.post("/getAllClients",getAllClients);

export default clientRouter;
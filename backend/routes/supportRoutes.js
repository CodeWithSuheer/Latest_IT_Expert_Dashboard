import { getAllSupports } from "../controllers/supportController.js";
import express from "express";

const supportRouter = express.Router();

supportRouter.post("/getAllSupports",getAllSupports);

export default supportRouter;
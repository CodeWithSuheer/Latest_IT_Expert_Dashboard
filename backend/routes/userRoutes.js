import express from "express";
import {
  approveUser,
  authUser,
  forgotPassword,
  getAllUsers,
  login,
  logout,
  rejectUser,
  resetPassword,
  signUp,
  updateUser,
} from "../controllers/userController.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.delete("/logout",verifyUser,logout);
userRouter.post("/approveUser",verifyUser,adminOnly,approveUser);
userRouter.post("/rejectUser",verifyUser,adminOnly,rejectUser);
userRouter.post("/updateRole", verifyUser,adminOnly,updateUser);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/getAllUsers", getAllUsers);
userRouter.get("/authUserSessionEverytime",authUser);

export default userRouter;

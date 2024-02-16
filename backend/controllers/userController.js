import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { sendEmail } from "../assets/nodemailer.js";
import mongoose from "mongoose";

function setMongoose() {
  return mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, returnValue) => {
      delete returnValue._id;
      delete returnValue.__v;
      delete returnValue.createdAt;
      delete returnValue.updatedAt;
    },
  });
}

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, isAuthenticated, superAdmin } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      isAuthenticated,
      superAdmin,
    });
    res.status(201).json({ msg: "User Registerd SuccessFully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }
    if (!user.isAuthenticated) {
      return res
        .status(403)
        .json({
          msg: "Your Account Is Still Pending For Approval Please Contact Admin",
        });
    }
    const isMatched = await bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      return res.status(403).json({ msg: "Invalid Credentials" });
    }
    req.session.userId = user.id;
    const { id, name, isAuthenticated, superAdmin } = user;
    email = user.email;
    return res
      .status(200)
      .json({ login: true, id, name, email, isAuthenticated, superAdmin });
  } catch (error) {
    return res.status(500).json({ login: false, error: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (error) return res.status(400).json({ msg: "Logout Unsuccessfull" });
      res.clearCookie("connect.sid");
      res.status(200).json({ msg: "Logout Successfull" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id, superAdmin } = req.body;
    if (!id) {
      throw new Error("Id required");
    }
  
    if (superAdmin === undefined ) {
      throw new Error("SuperAdmin value required ");
    }
    await User.findByIdAndUpdate(id, { superAdmin });
    res.status(200).json({ msg: "Role Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveUser = async (req,res,next) => {
  try {
    const {id} = req.body;
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.isAuthenticated) {
        throw new Error("User is already approved");
    }

    user.isAuthenticated = true;
    await user.save();
    res.status(200).json({ msg: "User approved successfully" });
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
};

export const rejectUser = async (req,res) => {
  try {
    const {id} = req.body;
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
        user.isApproved = false;
        await user.save();
        await User.findByIdAndDelete({ _id: user.id });
        res.status(200).json({ msg: "Rejected successfully" });
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const from = process.env.EMAIL_FROM;
  try {
    if (!email) {
      throw new Error("No Email Provided");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    let resetToken = JWT.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15min",
    });
    await sendEmail({ email, emailType: "RESETPASSWORD", resetToken });
    res.status(200).json({ msg: "Email Sent" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken, newPassword, confirmPassword } = req.body;
  try {
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords Not Matching");
    }
    const decode = await JWT.decode(resetToken, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decode.id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(user.id, { password: hashedPassword });
    res.status(200).json({ msg: "Password Reset Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const authUser = async (req, res , next) => {
  if (!req.session.userId) {
    return res.status(403).send({ msg: "Please Login Again" });
  }
  const user = await User.findById({
    _id: req.session.userId,
  });
  if (!user) {
    res.status(404).json({ msg: "Invalid Credentials" });
  }
  const { id, name, isAuthenticated, superAdmin , email } = user;
  res.status(200).json({ login: true, id, name, email, isAuthenticated, superAdmin });
};

export const getAllUsers = async (req ,res ,next) => {
  try {
      const users = await User.find().sort({createdAt: -1})
      setMongoose();
      res.status(200).json({ msg: "Got All Users", users });
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

import { User } from "../models/userModel.js";

export const verifyUser = async (req, res, next) =>{
  if(!req.session.userId){
      return res.status(401).json({msg: "Please Login Again"});
  }
  const user = await User.findOne({_id:req.session.userId });
  if(!user) return res.status(404).json({msg: "User Not Found"});
  req.userId = user.id;
  req.superAdmin = user.superAdmin; 
  next();
};

export const adminOnly = async (req,res,next) => {
    const user = await User.findOne({_id:req.session.userId});
      if (!user) {
       return res.status(404).json({msg:'Invalid Credentials'})
      };
      if (user.superAdmin === false){
        return res.status(401).json({msg:'Unauthorized'});    
      }
      next();
};
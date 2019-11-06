import jwt from "jsonwebtoken";
import devKeys from "../config/dev";
import ResponseHandler from "../utils/responseHandler";
import UserModel from "../models/userModel";


const tokenExists = (req, res, next) => {
  if (req.headers.authorization === " " || req.headers.authorization === undefined) {
    return res
      .status(400)
      .json(new ResponseHandler(400, "Sorry! No token provided!", null).result());
  }
  next();
};

const userAccess = async(req, res, next) => {

  // const {rows} = await UserModel.findUser();
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(401)
        .json(new ResponseHandler(401, "Access Denied.").result());
    }
    
    const decryptedToken = jwt.verify(token, devKeys.SECRET_OR_PUBLIC_KEY);
    req.user = decryptedToken;
    next();
    
    // else if(rows[0].user_id !== token){
    //   return res
    //   .status(401)
    //   .json(new ResponseHandler(401, "Access Denied.").result());
    // }else {
    //   const decryptedToken = jwt.verify(token, devKeys.SECRET_OR_PUBLIC_KEY);
    //   req.user = decryptedToken;
    //   next();
    // }
   
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseHandler(500, err.message, null, err).result());
  }
};

export {
  tokenExists,
  userAccess
};
import jwt from "jsonwebtoken";
import devKeys from "../config/dev";


export default {
  tokenizer(payload) {
    const token = jwt.sign(payload, devKeys.SECRET_OR_PUBLIC_KEY, {
      expiresIn: 86400,
    });
    return token;
  },

};
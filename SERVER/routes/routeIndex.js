import express from "express";
import User from "../controllers/userCtrl"; 
import { json, Router} from "express"; 


const router = express.Router(); 
router.use(json()); 

// User router 

router.post("/auth/signup", User.userSignUp); 


export default router;

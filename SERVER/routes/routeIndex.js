import express from "express";
import User from "../controllers/userCtrl"; 
import { json, Router} from "express"; 


const router = express.Router(); 
router.use(json()); 

// User router 

router.post("/auth/signup", User.SignUp); 
router.post("/auth/signin", User.SignIn);


export default router;

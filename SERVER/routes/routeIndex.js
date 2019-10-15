import express from "express";
import { json, Router} from "express"; 
import User from "../controllers/userCtrl";
import Entry from "../controllers/entryCtrl"; 



const router = express.Router(); 
router.use(json()); 

// User router 

router.post("/api/v1/auth/signup", User.SignUp); 
router.post("/api/v1/auth/signin", User.SignIn);


// Entry router 

router.post("/api/v1/entries", Entry.addEntry); 
router.get("/api/v1/entries", Entry.allEntries)

export default router;

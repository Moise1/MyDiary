import dotenv from "dotenv"; 

dotenv.config(); 

let config = {}; 

config.DATABASE_URL = process.env.DB_TEST; 
config.SECRET_OR_PUBLIC_KEY = process.env.SECRET_OR_PUBLIC_KEY; 
config.DB_PASSWORD = process.env.DB_PASSWORD;    

export default {
    DATABASE_URL: config.DATABASE_URL,
    secretOrPrivateKey: config.SECRET_OR_PUBLIC_KEY, 
    DB_PASSWORD: config.DB_PASSWORD
}  

import dotenv from "dotenv"; 

dotenv.config(); 

export default {
    DATABASE_URL: process.env.DB_TEST,
    SECRET_OR_PUBLIC_KEY: process.env.SECRET_OR_PUBLIC_KEY, 
    DB_PASSWORD: process.env.DB_PASSWORD

}
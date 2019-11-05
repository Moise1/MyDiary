import UserModel from "../models/userModel"; 
import {validateSignup, validateSignin} from "../helpers/userValidator" 
import {isSame} from "../helpers/password";
import lodash from "lodash";  
import ResponseHandler from "../utils/responseHandler"; 
import tokenMan from "../helpers/tokenMan"; 


class User {

    static async SignUp(req, res){
        const {error} = validateSignup(req.body); 
        if(error){
            return res 
            .status(400) 
            .json(new ResponseHandler(400, error.details[0].message, null).result());
        }

        try{

            const oneMail = await UserModel.findMail(req.body.email);
            if(oneMail.rows.length !== 0) 
            return res
            .status(409)
            .json(new ResponseHandler(409, 'Sorry! Email already taken.', null).result()); 

            const {
                rows
            } = await UserModel.create(req.body);

            
            const token = tokenMan.tokenizer({
                user_id: rows[0].user_id
            });
                      
            const returnedResponse = {
                token: token, 
                ...lodash.omit(rows[0], ["password"])
            }
            
            return res
            .status(201)
            .json(new ResponseHandler(201, 'User created successfully.', returnedResponse, null).result());
            
        }catch(error){
            return res 
            .status(500) 
            .json(new ResponseHandler(500, error.message, null).result())
        }

    }

    static async SignIn(req, res){
        const {error} = validateSignin(req.body); 
        if(error){
            return res 
            .status(400) 
            .json(new ResponseHandler(400, error.details[0].message, null).result());
        }    
        try{
            const {
                email,
                password
            } = req.body;

            // Check if email exists.
            const {
                rows
            } = await UserModel.findMail(email);


                if (rows.length === 0) {
                    return res
                    .status(404) 
                    .json(new ResponseHandler(404, `User with email ${email} is not found!`, null).result());
                }

                const matcher = await isSame(password, rows[0].password);

                if (!matcher) {
                    return res
                    .status(401) 
                    .json(new ResponseHandler(401, "Invalid Password", null).result());
                }

                const token = await tokenMan.tokenizer({
                    user_id: rows[0].user_id
                });

                const returnedResponse = {
                    token: token, 
                    ...lodash.omit(rows[0], ['password'])
                }
                return res
                .header('Authorization', `Bearer ${token}`)
                .status(200)
                .json(new ResponseHandler(200, "Successfully Signed In.", returnedResponse, null).result())


        }catch(error){
            return res
            .status(500)
            .json(new ResponseHandler(500, error.message, null).result())
        }
        
    }

} 


export default User;
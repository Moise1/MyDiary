import users from "../models/userModel"; 
import {signUpFields, loginFields} from "../helpers/userValidator" 
import {hashingPassword, isSame} from "../helpers/password";
import lodash from "lodash";  
import ResponseHandler from "../utils/responseHandler"; 
import tokenMan from "../helpers/tokenMan"; 


class User {

    static async SignUp(req, res){
        const {error} = signUpFields(req.body); 
        if(error){
            return res 
            .status(400) 
            .json(new ResponseHandler(400, error.details[0].message, null).result());
        }

        const {first_name, last_name, email, password} = req.body;
        const encrypted_password = await hashingPassword(password, 10); 
        
        try{
            const new_user = {
                user_id: users.length + 1,
                first_name: first_name, 
                last_name: last_name, 
                email: email.toLowerCase(), 
                password: encrypted_password
            }
    
            if(users.some(user => user.email === email)){
                return res 
                .status(409) 
                .json(new ResponseHandler(409, "Sorry! Email already taken.", null).result());
            }
            users.push(new_user);   
            const token = tokenMan.tokenizer({
                user_id: new_user.user_id, 
                email: new_user.email  
            });
            
            const returned_response = {
                token: token,
                ...lodash.omit(users[users.length -1], ["password"])
            }

            return res 
            .status(201) 
            .json(new ResponseHandler(201, "User created successfully.", returned_response, null).result())
            
        }catch(error){
            return res 
            .status(500) 
            .json(new ResponseHandler(500, error.message, null).result())
        }

    }

    static async SignIn(req, res){

        const {error} = loginFields(req.body); 
        if(error){
            return res 
            .status(400) 
            .json(new ResponseHandler(400, error.details[0].message, null).result());
        }


        try{
            const {email, password} = req.body; 

            const findUser = users.find(user => user.email === email); 
            if(!findUser) {
                return res 
                .status(404)
                .json(new ResponseHandler(404, `User with email ${email} not found!`, null).result())
            }
    
            const matcher = await isSame(password,findUser.password);
    
            if(!matcher){
                return res 
                .status(404)
                .json(new ResponseHandler(401, "Invalid Password.", null).result())
            } 
    
            const token = tokenMan.tokenizer({
                user_id: findUser.user_id, 
                email: findUser.email
            })
    
            const returned_response = {
                token: token,
                ...lodash.omit(findUser, ["password"])
            }
            
            return res
            .header("Authorization", `Bearer ${token}`)
            .status(200) 
            .json(new ResponseHandler(200, "Successfully Signed In", returned_response).result())

        }catch(error){
            return 
            .status(500)
            .json(new ResponseHandler(500, error.message, null).result())
        }
        
    }

} 


export default User;
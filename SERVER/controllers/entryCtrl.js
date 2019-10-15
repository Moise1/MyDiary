import entries from "../models/entryModel";
import {entryFields} from "../helpers/entryValidator"; 
import moment from "moment"; 
import ResponseHandler from "../utils/responseHandler";


class Entry {
    
    static async addEntry(req, res){

        const {error} = entryFields(req.body);
        if(error){
            return res 
            .status(400) 
            .json(new ResponseHandler(400, error.details[0].message, null).result());
        }

        try{

            let date = moment(); 
            const created_on = date.format("YYYY-MM-DD | LT");
            const {title, description} = req.body;
    
            const new_entry = {
                entry_id: entries.length + 1, 
                title: title, 
                description: description,
                created_on
            }
    
            entries.push(new_entry); 
            return res 
            .status(201) 
            .json(new ResponseHandler(201, "Entry successfully created", entries[entries.length -1], null).result())
            
        }catch(error){
            return res 
            .status(500)
            .json(new ResponseHandler(500, error.message, null).result());
        }
    }

    static async allEntries(req, res){

        try{
            return res 
            .status(200)
            .json(new ResponseHandler(200, "All Entries", entries.reverse(), null).result())

        }catch(error){
            return res 
            .status(500)
            .json(new ResponseHandler(500, error.message, null).result())
        }
    }

    static async singleEntry(req, res){

        const theEntry = entries.find(ent => ent.entry_id === parseInt(req.params.entry_id)); 

       try{
        if(!theEntry){
            return res 
            .status(404)
            .json(new ResponseHandler(404, `Sorry! Entry number ${req.params.entry_id} not found`, null).result())
        }

        return res 
        .status(200)
        .json(new ResponseHandler(200, "Your Entry!", theEntry, null).result());

       }catch(error){
           return res 
           .status(500)
           .json(new ResponseHandler(500, error.message, null).result())
       }
    }
} 


export default Entry;
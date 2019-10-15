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

        let date = moment(); 
        const created_on = date.format('YYYY-MM-DD');
        const {title, description} = req.body;

        const new_entry = {
            entry_id: entries.length + 1, 
            title: title, 
            description: description,
            ...created_on 
        }

        entries.push(new_entry); 
        return res 
        .status(201) 
        .json(new ResponseHandler(201, "Entry successfully created", entries[entries.length -1], null).result())
    }
}
import entries from "../models/entryModel";
import {
    entryFields
} from "../helpers/entryValidator";
import lodash from "lodash";
import moment from "moment";
import ResponseHandler from "../utils/responseHandler";
import tokenMan from "../helpers/tokenMan";
import users from "../models/userModel";
import slugText from "../utils/slug"; 



class Entry {

    static async addEntry(req, res) {

        const {
            error
        } = entryFields(req.body);
        if (error) {
            return res
                .status(400)
                .json(new ResponseHandler(400, error.details[0].message, null).result());
        }



        try{

            let date = moment(); 
            const created_on = date.format("YYYY-MM-DD | LT");
            const {title, description} = req.body;
            const slug = slugText(title);
            const new_entry = {
                entry_id: entries.length + 1, 
                title: title, 
                slug,
                description: description,
                user_id: req.user.user_id,
                created_on
            }

            if(entries.some(ent => ent.title === new_entry.title)){
                return res 
                .status(409)
                .json(new ResponseHandler(409, "Sorry! This title exists", null).result())

            }else {
            entries.push(new_entry);
            return res
                .status(201)
                .json(new ResponseHandler(201, "Entry successfully created.", lodash.omit(entries[entries.length - 1], ["user_id"]), null).result())
            }
            

        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result());
        }
    }

    static async allEntries(req, res) {

        try {

            
            const allEntries = entries.filter(ent => ent.user_id === req.user.user_id);

           if(allEntries.length == 0){
                return res 
                .status(404)
                .json(new ResponseHandler(404, "Sorry! You haven't created any entry yet.").result())
            }else{
                return res 
                .status(200)
                .json(new ResponseHandler(200, "All Entries.", allEntries.reverse(), null).result())
            }
                
           
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }
    }

    static async singleEntry(req, res) {

        const allEntries = entries.filter(ent => ent.user_id === req.user.user_id);
        const filteredEntry = allEntries.find(ent => ent.entry_id === parseInt(req.params.entry_id));
        try {
           
            if(!filteredEntry){
                return res 
                .status(404)
                .json(new ResponseHandler(404, "Sorry! You can only view your own entry.", null).result())
            }else {
                return res
                    .status(200)
                    .json(new ResponseHandler(200, "Your Entry!", filteredEntry, null).result());
            }
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }
    }

    static async updateEntry(req, res) {

        const allEntries = entries.filter(ent => ent.user_id === req.user.user_id);
        const filteredEntry = allEntries.find(ent => ent.entry_id === parseInt(req.params.entry_id));
        try {

             if(!filteredEntry){
                return res 
                .status(404)
                .json(new ResponseHandler(404, "Sorry! You can only update your own entry.", null).result())
            }else{
                filteredEntry.title = req.body.title || filteredEntry.title;
                filteredEntry.description = req.body.description || filteredEntry.description;

                return res
                    .status(200)
                    .json(new ResponseHandler(200, `Entry number ${req.params.entry_id} successfully updated!`, theEntry, null).result())
            }
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }

    }

    static async deleteEntry(req, res) {

        const theEntry = entries.find(ent => ent.entry_id === parseInt(req.params.entry_id)); 
        const allEntries = entries.filter(ent => ent.user_id === req.user.user_id);
        const filteredEntry = allEntries.find(ent => ent.entry_id === parseInt(req.params.entry_id));
        try {

            if (!theEntry) {
                return res
                    .status(404)
                    .json(new ResponseHandler(404, `Sorry! Entry number ${req.params.entry_id} not found`, null).result())
            }else if(!filteredEntry){
                return res 
                .status(404)
                .json(new ResponseHandler(404, "Sorry! You can only delete your own entry.", null).result())
            }else {
                const index = entries.indexOf(theEntry);
                entries.splice(index, 1);

                return res
                    .status(200)
                    .json(new ResponseHandler(200, `Entry number ${req.params.entry_id} successfully deleted!`, null).result())
            }
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }

    }
}


export default Entry;
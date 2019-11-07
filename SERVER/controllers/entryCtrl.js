import EntryModel from "../models/entryModel";
import {
    validateEntry
} from "../helpers/entryValidator";
import lodash from "lodash";
import ResponseHandler from "../utils/responseHandler";
import PageResponse from "../utils/pageResponse";
import tokenMan from "../helpers/tokenMan";
import UserModel from "../models/userModel";




class Entry{

    static async addEntry(req, res) {

        const {error} = validateEntry(req.body); 
        if(error){
            return res 
            .status(400) 
            .json(new ResponseHandler(400, (error.details || []).map(er => er.message), null).result());
        }

        try{
        
        const theTitle = await EntryModel.findTitle(req.body.title);

        if(theTitle.rows.length !== 0){
            return res
            .status(409)
            .json(new ResponseHandler(409, "Sorry! This title exists").result());
        }else {

            const {rows} = await EntryModel.create(req.body, req.user.user_id); 
            return res
            .status(201)
            .json(new ResponseHandler(201, "Entry successfully created.", rows).result());
        }            

        }catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result());
        } 
    }

    static async allEntries(req, res) {

        try {


        const owner_id = req.user.user_id; 
        const user_data = await UserModel.findUser(owner_id); 
        const theOwner = await EntryModel.specificOwner(user_data.rows[0].user_id);
        
        const {rows} = await EntryModel.getAll(); 
        const {page} = req.query;
        

 
        if(theOwner.rows.length === 0 ){
            return res 
            .status(404)
            .json(new PageResponse(200, 'Sorry! You haven\'t created any entry yet.').result())

        }else if(page <= 0 || page > rows.length || typeof(parseInt(page)) === "string"  ){

            return res 
            .status(404)
            .json(new PageResponse(404, "Sorry! This page doesn't exist").result())

        }else if(page > 0 ){
            
            let currentPage = page * 1;
            const totalEntries = rows.length; 
            const entriesPerPage = 3;
            const totalPages = Math.round(totalEntries / entriesPerPage); 
            const startingEntry = (entriesPerPage * currentPage) - entriesPerPage;
            const endingEntry = (entriesPerPage * currentPage);
            const finalData = rows.slice(startingEntry, endingEntry);

            return res 
            .status(200)
            .json(new PageResponse(
                200, 
                "All Entries.", 
                page, totalPages,
                 entriesPerPage, 
                 totalEntries , 
                 finalData.reverse()).result())

        }else{
          return res 
            .status(200)
            .json(new ResponseHandler(200, "All Entries.", rows.reverse()).result())
        }

        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message).result())
        }
    }

    
    static async singleEntry(req, res) {
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
                .json(new ResponseHandler(404, "Sorry! You can only update your own entry.", null).result())
            }else{
                filteredEntry.title = req.body.title || filteredEntry.title;
                filteredEntry.description = req.body.description || filteredEntry.description;

                return res
                    .status(200)
                    .json(new ResponseHandler(200, `Entry number ${req.params.entry_id} successfully updated!`, filteredEntry, null).result())
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
                const index = entries.indexOf(filteredEntry);
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
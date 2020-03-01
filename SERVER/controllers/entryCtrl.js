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
        const {page =1} = req.query;
        
        
        if(theOwner.rows.length === 0 ){
            return res 
            .status(404)
            .json(new PageResponse(200, 'Sorry! You haven\'t created any entry yet.').result())

        }else if( page <= 0 || page > rows.length || Number.isNaN(page *1)){

                return res 
                .status(404)
                .json(new PageResponse(404, "Sorry! This page doesn't exist").result())
                
            }else{
 
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
                    page,
                    totalPages,
                    entriesPerPage, 
                    totalEntries , 
                    finalData.reverse()).result())
            }
       
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message).result())
        }
    }

    
    static async singleEntry(req, res) {
       
        const {entry_id} = req.params; 
        const owner_id = req.user.user_id; 
        const user_data = await UserModel.findUser(owner_id); 
        const theOwner = await EntryModel.specificOwner(user_data.rows[0].user_id);


        try {

            const {rows} = await EntryModel.getOne(parseInt(entry_id)); 

            if (rows.length === 0) {
                return res
                .status(404)
                .json(new ResponseHandler(404,  `Entry number ${entry_id} is not found!`).result());

            }else if(theOwner.rows.length === 0 ){
                return res 
                .status(404)
                .json(new PageResponse(200, 'Sorry! You can only view your own entry.').result())
                
            }else {
                return res
                    .status(200)
                    .json(new ResponseHandler(200, "Your Entry!", rows[0]).result());
            }
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }
    }

    static async updateEntry(req, res) {

        const {entry_id} = req.params; 
        const owner_id = req.user.user_id; 
        const user_data = await UserModel.findUser(owner_id); 
        const theOwner = await EntryModel.specificOwner(user_data.rows[0].user_id);
        const theEntry = await EntryModel.getOne(entry_id); 

        try {


            if (theEntry.rows.length === 0) {
                return res
                .status(404)
                .json(new ResponseHandler(404,  'Entry is not found!').result());

            }else if(theOwner.rows.length === 0 ){
                return res 
                .status(404)
                .json(new PageResponse(200, 'Sorry! You can only update your own entry.').result())
                
            }else {

                const {rows} = await EntryModel.Updater(entry_id, req.body); 
                return res
                    .status(200)
                    .json(new ResponseHandler(200, 'The entry is successfully updated!', rows[0]).result());
            }
              
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null, error).result())
        }

    }

    static async deleteEntry(req, res) {

        const {entry_id} = req.params; 
        const owner_id = req.user.user_id; 
        const user_data = await UserModel.findUser(owner_id); 
        const theOwner = await EntryModel.specificOwner(user_data.rows[0].user_id);
        const theEntry = await EntryModel.getOne(entry_id); 

        try {


            if (theEntry.rows.length === 0) {
                return res
                .status(404)
                .json(new ResponseHandler(404,  'Entry is not found!').result());

            }else if(theOwner.rows.length === 0 ){
                return res 
                .status(404)
                .json(new PageResponse(200, 'Sorry! You can only delete your own entry.').result())
                
            }else {

                await EntryModel.remover(entry_id); 
                return res
                    .status(200)
                    .json(new ResponseHandler(200, 'Entry successfully deleted!').result());
            }
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }

    }
}


export default Entry;
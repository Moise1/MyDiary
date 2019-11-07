import db from "../db/dbInit"; 
import moment from "moment";

class EntryModel {

    static async create(req, user_id){

        let theMoment = moment();
        const create_on = theMoment.format("YYYY-MM-DD"); 

        const {title,  description} = req; 
        const new_entry = {
            user_id: user_id,
           title: title,  
           description: description, 
        }

        const queryText = 'INSERT INTO entries(user_id, title, description, created_on) VALUES($1, $2, $3, $4)RETURNING*'; 

        const values = [
            new_entry.user_id, 
            new_entry.title, 
            new_entry.description,
            create_on
        ]

        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }


    static async getAll(){
        const queryText = "SELECT * FROM entries"; 
        const queryResult = await db.query(queryText); 
        return queryResult; 

    } 

    static async getOne(entry_id){
        const queryText = "SELECT * FROM entries WHERE entry_id=$1"; 
        const queryResult = await db.query(queryText, [parseInt(entry_id)]); 
        return queryResult; 

    } 

    
    static async specificOwner(ownerId){
        const queryText = "SELECT entries.user_id FROM entries WHERE user_id=$1"; 
        const queryResult = await db.query(queryText, [ownerId]);
        return queryResult;
    } 

    static async findTitle(entry_title){
        const queryText = "SELECT * FROM entries WHERE title=$1";
        const queryResult = await db.query(queryText, [entry_title]);
        return queryResult; 
    } 


    static async Updater(entry_id, input){
        const theMoment = moment(); 
        const {
            rows
        } = await this.getOne(entry_id);
        const title = input.title || rows[0].title;
        const description = input.description  || rows[0].description;
        const modified_on = theMoment.format("YYYY-MM-DD");
        const queryText = "UPDATE entries SET title=$1, description=$2, modified_on=$3 WHERE entry_id=$4 RETURNING*";
        const queryResult = await db.query(queryText, [title, description, modified_on, rows[0].entry_id]);
        return queryResult;

    }

    static async remover(entry_id) {
        const {
            rows
        } = await this.getOne(entry_id);
        const queryText = "DELETE FROM entries WHERE entry_id=$1";
        const queryResult = await db.query(queryText, [rows[0].entry_id]);
        return queryResult;
    }


}

export default EntryModel; 
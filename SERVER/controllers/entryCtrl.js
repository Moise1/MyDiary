import entries from "../models/entryModel";
import {
    entryFields
} from "../helpers/entryValidator";
import lodash from "lodash";
import moment from "moment";
import ResponseHandler from "../utils/responseHandler";
import tokenMan from "../helpers/tokenMan";
import users from "../models/userModel";



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

        try {
            let date = moment();
            const created_on = date.format("YYYY-MM-DD | LT");
            const {
                title,
                description
            } = req.body;


            const new_entry = {
                entry_id: entries.length + 1,
                title: title,
                description: description,
                user_id: req.user.user_id,
                created_on
            }

            entries.push(new_entry);

            return res
                .status(201)
                .json(new ResponseHandler(201, "Entry successfully created.", lodash.omit(entries[entries.length - 1], ["user_id"]), null).result())

        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result());
        }
    }

    static async allEntries(req, res) {

        try {

            if (entries.length === 0) {
                return res
                    .status(404)
                    .json(new ResponseHandler(404, "No entries yet.", null).result())
            }

            const theEntry = entries.find((ent) => {
                return ent.user_id;
            })

            if (req.user.user_id !== theEntry.user_id) {
                return res
                    .status(403)
                    .json(new ResponseHandler(403, "Sorry! Only the entry owner allowed!", null).result());

            } else {
                return res
                    .status(200)
                    .json(new ResponseHandler(200, "All Entries.", entries.reverse(), null).result())
            }

        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }
    }

    static async singleEntry(req, res) {

        const theEntry = entries.find(ent => ent.entry_id === parseInt(req.params.entry_id));

        try {
            if (!theEntry) {
                return res
                    .status(404)
                    .json(new ResponseHandler(404, `Sorry! Entry number ${req.params.entry_id} not found`, null).result())
            } else if (req.user.user_id !== theEntry.user_id) {
                return res
                    .status(403)
                    .json(new ResponseHandler(403, "Sorry! Only the entry owner allowed!", null).result());
            } else {
                return res
                    .status(200)
                    .json(new ResponseHandler(200, "Your Entry!", theEntry, null).result());
            }
        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null).result())
        }
    }

    static async updateEntry(req, res) {

        const theEntry = entries.find(ent => ent.entry_id === parseInt(req.params.entry_id));

        try {

            if (!theEntry) {
                return res
                    .status(404)
                    .json(new ResponseHandler(404, `Sorry! Entry number ${req.params.entry_id} not found`, null).result())
            } else if (req.user.user_id !== theEntry.user_id) {
                return res
                    .status(403)
                    .json(new ResponseHandler(403, "Sorry! Only the entry owner allowed!", null).result());
            } else {
                theEntry.title = req.body.title || theEntry.title;
                theEntry.description = req.body.description || theEntry.description;

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

        try {

            if (!theEntry) {
                return res
                    .status(404)
                    .json(new ResponseHandler(404, `Sorry! Entry number ${req.params.entry_id} not found`, null).result())
            } else if (req.user.user_id !== theEntry.user_id) {
                return res
                    .status(403)
                    .json(new ResponseHandler(403, "Sorry! Only the entry owner allowed!", null).result());
            } else {
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
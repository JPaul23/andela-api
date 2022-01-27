/* Users models MongoDB */
import mongoose from "mongoose";
//import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

var User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('User', User);
export default userModel;
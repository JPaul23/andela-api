/* Users models MongoDB */
import mongoose from "mongoose";
//import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
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
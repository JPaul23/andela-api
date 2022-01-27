import mongoose from "mongoose";

const Schema = mongoose.Schema;

var Article = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const articleModel = mongoose.model('Article', Article);
export default articleModel;

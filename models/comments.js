import mongoose from "mongoose";

const Schema = mongoose.Schema;

var Comment = new Schema({
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    articleId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const commentModel = mongoose.model('Comment', Comment);
export default commentModel;

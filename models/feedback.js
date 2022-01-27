import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var Feedback = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    message: {
        type: Number,
        required: true
    },

}, {
    timestamps: true
});

const feedbackModel = mongoose.model('Feedback', Feedback);
export default feedbackModel;

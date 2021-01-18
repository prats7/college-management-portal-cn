const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const AssignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    assignment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Assignment = mongoose.model('assignment', AssignmentSchema);
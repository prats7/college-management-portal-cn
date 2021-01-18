const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const FileSchema = new Schema({


    file: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Task = mongoose.model('task', TaskSchema);
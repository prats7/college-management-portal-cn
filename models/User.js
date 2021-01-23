const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

//Create schema
const UserSchema = new Schema({
    userType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    },
    register_date: {
        type: Date,
        default: Date.now
    }

});

UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.set('useFindAndModify', false);


module.exports = User = mongoose.model('user', UserSchema);
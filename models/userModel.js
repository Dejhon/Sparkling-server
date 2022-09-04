const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const Login = mongoose.model('users', User)
module.exports = Login
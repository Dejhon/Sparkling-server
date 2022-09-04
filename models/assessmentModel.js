const mongoose = require('mongoose');

const assessment = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    }    
});

const Assessment = mongoose.model('assessment', assessment)
module.exports = Assessment
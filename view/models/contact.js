const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:{type:String,require:true},
    lastName: {type:String,require:true},
    email: {type:String, required : true,unique:true,dropDubs:true},
    password: {type:String,require:true},

});

module.exports = mongoose.model('User',userSchema);
var mongoose = require('mongoose');

var student = mongoose.Schema({
    name: String,
    address: String,
    phone: { home: String, work: String },
    password: String,
    admin: Boolean,
    email: String
},{collection:'students'});

module.exports=mongoose.model('Student', student);
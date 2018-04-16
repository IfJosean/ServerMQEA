var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Student = mongoose.model('Student');

var subject = mongoose.Schema({
    name: String,
    quatri: String,
    studies: String,
    studentId: [{type:Schema.ObjectId, ref: 'Student'}]
},{collection:'subjects'});

module.exports=mongoose.model('Subject', subject);
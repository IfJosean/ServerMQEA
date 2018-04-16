var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');

//read methods
exports.listAllSubject = function(req, res) {

    Subject.find().populate('studentId').exec(function (err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    })
};

exports.findByName = function(req, res) {
    Subject.find({name:req.params.subjectName}).populate('studentId').exec( function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.findByQuatri = function(req, res) {
    Subject.find({quatri:req.params.subjectName}).populate('studentId').exec( function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.findByStudies = function(req, res) {
    Subject.find({studies:req.params.subjectName}).populate('studentId').exec( function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

//insert methods
exports.insertSubject= function(req, res) {
    var newSubject = new Subject(req.body);
    newSubject.save(function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

//update methods
exports.updateSubject = function(req, res) {
    console.log(req.body);
    console.log(req.body.studentId[0]);
    Subject.findOneAndUpdate({_id:req.params.subjectId}, {"$push": { "studentId": req.body.studentId[0] }},req.body, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

//update-delete methods
exports.updateDeleteSubject = function(req, res) {
    console.log(req.body);
    console.log(req.body.studentId[0]);
    Subject.findOneAndUpdate({_id:req.params.subjectId}, {"$pull": { "studentId": req.body.studentId[0] }},req.body, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

//delete methods
exports.deleteSubject = function(req, res) {
    Subject.findByIdAndRemove(req.params.subjectId, function(err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'Subject successfully deleted' });
    });
};
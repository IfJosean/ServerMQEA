var mongoose = require('mongoose');
var Student = mongoose.model('Student');

//read methods
exports.listAllStudent = function(req, res) {
    Student.find({}, function(err, students) {
        if (err)
            res.send(err);
        res.json(students);
    });
};

exports.findByName = function(req, res) {
    Student.find({name:req.params.studentName}, function(err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};


//insert methods
exports.insertStudent= function(req, res) {
    var newStudent = new Student(req.body);
    console.log(newStudent);
   newStudent.save(function(err, student) {
        if (err)
            res.send(err);
        res.json(student);
        console.log(err + student);
    });
};


//delete methods
exports.deleteStudent = function(req, res) {
    Student.findByIdAndRemove(req.params.studentId, function(err, student) {
        if (err)
            res.send(err);
        res.json({ message: 'Product successfully deleted' });
    });
};

//update methods
exports.updateStudent = function(req, res) {
    Student.findOneAndUpdate({_id:req.params.studentId}, req.body, {new: true}, function(err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};
/////////////////////////////////////////////////////////////////////

exports.loginUser=function(req,res){
    var params = req.body;
    var username = params.username;
    var password = params.password;

    User.findOne({username: username}, function(err, user) {
        if(err){
            res.status(500).send({message: 'Internal server error'});
        }else{
            if(user){
                if(password == user.password){
                    user.loged=true;
                    res.status(200).json(user);
                }else{
                    res.status(401).send({message: 'Incorrect credentials'});
                }
            }else{
                res.status(404).send({message: 'User not found'});
            }
        }
    });
};


/////////////////////////////////////////////////////////////////////
let User = require('../model/user');
let Activity = require('../model/activity');

/***************************** FUNCIONES SOBRE USUARIOS *****************************/

// Devuelve una lista con todos los usuarios
exports.selectAllUsers = function (req, res) {
    User.find({}, { __v: false })
        .populate('listaOfertada').populate('listaRecibida')
        .exec( function (err, users) {
                if (err) {
                    console.log(err);
                    return res.status(202).send({'result': 'ERROR'});  // Devuelve un JSON
                } else {
                    return res.status(200).send(users);                // Devuelve un JSON
                }
            }
        );
};

// Devuelve el usuario buscado
exports.selectOneUser = function (req, res) {
    User.findOne({ username: req.params.name }, { __v: false })
        .populate('listaOfertada').populate('listaRecibida')
        .exec( function (err, user) {
                if(err){
                    console.log(err);
                    return res.status(202).send({'result': 'ERROR'});  // Devuelve un JSON
                }else{
                    return res.status(200).send(user);                 // Devuelve un JSON
                }
            }
        );
};

// Inserta un nuevo usuario (username único)
exports.insertUser = function (req, res) {
    User(req.body).save(function (err) {
        if(err){
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});     // Devuelve un JSON
        }else{
            return res.status(201).send({'result': 'INSERTADO'}); // Devuelve un JSON
        }
    });
};

// Actualiza la información de un usuario
exports.updateUser = function (req, res) {
    User.update({ username: req.params.name }, req.body, function(err) {
        if (err) {
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});       // Devuelve un JSON
        }else{
            return res.status(200).send({'result': 'ACTUALIZADO'}); // Devuelve un JSON
        }
    });
};

// Elimina de la Base de Datos el usuario buscado
exports.deleteUser = function (req, res) {
    User.remove({ username: req.params.name }, function(err) {
        if(err){
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});     // Devuelve un JSON
        }else{
            return res.status(200).send({'result': 'ELIMINADO'}); // Devuelve un JSON
        }
    });
};

/*************************** FUNCIONES SOBRE ACTIVIDADES *****************************/

// Devuelve una lista con todas las actividades
exports.selectAllActivities = function (req, res) {
    Activity.find({}, { __v: false }, function (err, activities) {
        if(err){
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});  // Devuelve un JSON
        }else{
            return res.status(200).send(activities);           // Devuelve un JSON
        }
    });

};

// Devuelve las actividad buscada
exports.selectOneActivity = function (req, res) {
    Activity.findOne({ _id: req.params.id }, { __v: false }, function (err, activity) {
        if(err){
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});  // Devuelve un JSON
        }else{
            return res.status(200).send(activity);             // Devuelve un JSON
        }
    });
};

// Inserta una nueva actividad
exports.insertActivity = function (req, res) {
    Activity(req.body).save(function (err) {
        if(err){
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});     // Devuelve un JSON
        }else{
            return res.status(201).send({'result': 'INSERTADO'}); // Devuelve un JSON
        }
    });
};

// Actualiza la información de una actividad
exports.updateActivity = function (req, res) {
    Activity.update({ name: req.params.id }, req.body, function(err) {
        if (err) {
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});       // Devuelve un JSON
        }else{
            return res.status(200).send({'result': 'ACTUALIZADO'}); // Devuelve un JSON
        }
    });
};

// Elimina de la Base de Datos la actividad buscada
exports.deleteActivity = function (req, res) {
    Activity.remove({ name: req.params.id }, function(err) {
        if(err){
            console.log(err);
            return res.status(202).send({'result': 'ERROR'});     // Devuelve un JSON
        }else{
            return res.status(200).send({'result': 'ELIMINADO'}); // Devuelve un JSON
        }
    });
};
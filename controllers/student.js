var mongoose = require('mongoose');
var Student = mongoose.model('Student');
let User = require('../model/user');

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
  var username = params.name;
  var password = params.password;

  User.findOne({name: username}, function(err, user) {
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


/**************************** FUNCIONES SOBRE USUARIOS ****************************/

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
  User.findOne({ name: req.params.name }, { __v: false })
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

// Inserta un nuevo usuario (name único)
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
  User.update({ name: req.params.name }, req.body, function(err) {
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
  User.findByIdAndRemove({ name: req.params.name }, function(err) {
    if(err){
      console.log(err);
      return res.status(202).send({'result': 'ERROR'});     // Devuelve un JSON
    }else{
      return res.status(200).send({'result': 'ELIMINADO'}); // Devuelve un JSON
    }
  });
};


exports.searchName = function(req, res) {
  User.find({name:req.params.name}).exec( function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.searchSurname = function(req, res) {
  User.find({surname:req.params.surname}).exec( function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.searchRole = function(req, res) {
  let admin = false;
  if (req.params.role === 'Admin'||req.params.role === 'admin'){admin = true;}
  User.find({role:admin}).exec( function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.searchState = function(req, res) {
  let state = false;
  if (req.params.role === 'Actiu'||req.params.role === 'actiu'){state = true;}
  User.find({state:state}).exec( function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

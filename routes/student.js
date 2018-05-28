var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var student = require('../controllers/student');



//GET REQUESTS
//get all the user
router.get('/api/todos',student.listAllStudent);

//POST REQUESTS
//insert user
router.post('/api/', student.insertStudent);

//DELETE REQUESTS
//delete user by id
router.delete('/api/:studentId',student.deleteStudent);

//UPDATE REQUESTS
//update user by id
router.post('/api/edit/:studentId', student.updateStudent);

//GET REQUESTS
//get students
router.get('/api/:studentName',student.findByName);

// Funciones sobre Usuarios
router.get('/users/select', student.selectAllUsers);              // Devuelve una lista con todos los usuarios
router.get('/users/select/:name', student.selectOneUser);         // Devuelve el usuario buscado
router.post('/users/insert', student.insertUser);                 // Inserta un nuevo usuario (username único)
router.post('/users/update/:name', student.updateUser);           // Actualiza la información de un usuario
router.get('/users/delete/:name', student.deleteUser);            // Elimina de la Base de Datos el usuario buscado
router.get('/users/searchName/:name', student.searchName);
router.get('/users/searchSurname/:surname', student.searchSurname);
router.get('/users/searchRole/:role', student.searchRole);
router.get('/users/searchState/:state', student.searchState);
router.get('/user/modifyUser/:name', student.modifyUser);
router.post('/users/deleteUser', student.deleteUserrr);            // Elimina de la Base de Datos el usuario buscado




module.exports=router;

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

// Funciones sobre Actividades
router.get('/activities/select', student.selectAllActivities);    // Devuelve una lista con todas las actividades
router.get('/activities/select/:id', student.selectOneActivity);  // Devuelve las actividad buscada
router.post('/activities/insert', student.insertActivity);        // Inserta una nueva actividad
router.post('/activities/update/:id', student.updateActivity);    // Actualiza la información de una actividad
router.get('/activities/delete/:id', student.deleteActivity);     // Elimina de la Base de Datos la actividad buscada


module.exports=router;
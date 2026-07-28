const express = require('express');
const routes = express.Router();
const PostController = require('./controllers/PostController');
const TeacherController = require('./controllers/TeacherController'); 
const StudentController = require('./controllers/StudentController');

routes.get('/posts/search', PostController.search);
routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.post('/posts', PostController.store);
routes.post('/posts/:id/comentarios', PostController.storeComment);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.destroy);

routes.get('/teachers', TeacherController.index);
routes.get('/teachers/:id', TeacherController.show);
routes.post('/teachers', TeacherController.store);
routes.post('/teachers/login', TeacherController.login);

routes.put('/teachers/:id', TeacherController.update);
routes.delete('/teachers/:id', TeacherController.destroy);

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);
routes.post('/students/login', StudentController.login);

module.exports = routes;
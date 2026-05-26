const express = require('express');
const routes = express.Router();
const PostController = require('./controllers/PostController');

routes.get('/posts/search', PostController.search);
routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.post('/posts', PostController.store);
routes.post('/posts/:id/comentarios', PostController.storeComment);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.destroy);

module.exports = routes;

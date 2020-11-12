const express = require('express');
const routes = express.Router();

const UserControlller = require('./controller/userControlller');


routes.get('/user', UserControlller.index);
routes.get('/user/:id', UserControlller.show);

routes.get('/username/:username', UserControlller.query);

routes.post('/user', UserControlller.store);
routes.put('/user/:id', UserControlller.update);
routes.delete('/user/:id', UserControlller.destroy);


module.exports = routes;
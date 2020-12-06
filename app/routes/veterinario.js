const express = require('express');
const UserCtrl = require('../controllers/veterinarioController');
const routerU = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
routerU.post('/', UserCtrl.create)
    .get('/:key/:value', UserCtrl.find, UserCtrl.show) 
    .put('/:key/:value', UserCtrl.find, UserCtrl.update)
    .put('/password/:key/:value', UserCtrl.find, UserCtrl.updatePassword)

module.exports = routerU;
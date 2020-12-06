const express = require('express');
const petCtrl = require('../controllers/mascotaController');
const routerU = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
routerU.post('/', petCtrl.create)
    .get('/:key/:value', petCtrl.find, petCtrl.show) 
    .put('/:key/:value', petCtrl.find, petCtrl.update)

module.exports = routerU;
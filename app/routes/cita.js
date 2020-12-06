const express = require('express');
const citaCtrl = require('../controllers/citaController');
const routerU = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
routerU.post('/', citaCtrl.findPet, citaCtrl.create)
    .get('/:key/:value', citaCtrl.find, citaCtrl.show) 
    .put('/:key/:value', citaCtrl.find, citaCtrl.update)

module.exports = routerU;
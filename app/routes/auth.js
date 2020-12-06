const express = require('express');
const AuthCtrl = require('../controllers/AuthController');
const router = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
router.post('/login', AuthCtrl.login)

module.exports = router;
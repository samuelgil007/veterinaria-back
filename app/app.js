const express = require('express');
const bodyParser = require('body-parser');
const User = require('./routes/veterinario');
const Pet = require('./routes/mascota');
const Cita = require('./routes/cita');
const Auth = require('./routes/auth');
const AuthToken = require('./middleware/AuthToken')

const app = express();
const cors = require('cors');
app.use(cors());

//app.use(AuthToken); // antes d ecualquier ruta se ejecuta este 


//para poder manejar jsons, peticiones y respuestas
app.use(bodyParser.json());
//se dice que no utilizamos peticiones directamente en formularios, sino que se procesa en formato json
app.use(bodyParser.urlencoded({ extended: false }));




// creo el path primero /user y ya lo que sigue de la , es el product que puede variar
app.use('/user', User);
// crea el path /auth
app.use('/auth', Auth);
//crea el path mascota
app.use('/pet', Pet);
//crea el path cita
app.use('/cita', Cita);


module.exports = app;
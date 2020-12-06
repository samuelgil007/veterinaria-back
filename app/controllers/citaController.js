const cita = require('../models/cita');
const Pet = require('../models/mascota');
let html = require('../models/pdf');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');

function index(req, res) {
    // busco todos los users y si no da error me devuelve arreglo users
    cita.find({}).then(users => {
        // si hay usuarios envio codigo de aceptacion y un cuerpo con los prdctos
        if (users.length) return res.status(200).send({ users });
        //en caso de que no hayan datos se manda un codigo y un mensaje xD
        return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
}

function create(req, res) {
    //se inicializa una variable con los datos de mi body
    let citaNueva = new cita(req.body);
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'ERROR: La mascota aun no esta registrada o \n hay un error en los campos nombre de la mascota y cedula del dueño.' });
    
    //guardo con el metodo save el nuevo usuario
    citaNueva.save().then(user => {
        /* payload = { //se debe meter fecha de entrega
             email: user.email,
             name: user.name,
             _id: user._id,
             role: user.role

         }*/
        //const token = jwt.sign(payload, CONFIG.SECRET_TOKEN); // aca se deberia de poner la duración del token y demas

        /* return res.status(201).send({ user, token });*/
        return res.status(201).send({ user, message: "La cita fue creada exitosamente" });


    }).catch(error => res.status(500).send({ message: "Ya existe una cita con estos campos", error }));
}


function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found :"V' });
    let users = req.body.users;
    return res.status(200).send({ users });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    let query = {};
    query[req.params.key] = req.params.value;
    //valores para hacer update
    let update = {
        activa: "false",
        diagnostico: req.body.diagnostico
    };

      //Creamos objeto del emisor
      let emailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'udeaveterinariasoftware@gmail.com',
            pass: 'equipo1999'
        }
    });
        //Crear pdf 
        let archvivo;
        pdf.create(html.contenido(req.body.name,req.body.name_owner,req.body.date,req.body.name_vet,req.body.type,req.body.diagnostico)).toFile('./DiagnosticoVeterinaria.pdf', function(err, res) {
            if (err){
                console.log(err);
            } else {
                archvivo = res;
            }
        });
    //datos del receptor
    let mailOptions = {
        from: 'udeaveterinariasoftware@gmail.com',
        to: req.body.email,
        subject: 'Veterinaria',
        text: "Gracias por preferir nuestra veterinaria aqui esta la prescripción de la cita. "
        ,attachments: [
            {   // utf-8 string as an attachment
                filename: 'DiagnosticoVeterinaria.pdf',
                path: './DiagnosticoVeterinaria.pdf',
                contentType: 'application/pdf' 
            }]
    };
    cita.updateOne(query, update, (err, user) => {
        if (err) res.status(500).send({ message: `Error ${err}` })
        

        //Mandar email
        emailer.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).send({ message: "Cita terminada con exito" })
    }).catch(error => {
        return res.status(500).send({ error , message: "No se puede terminar la cita"});
    });
}

// como buscar se repite en show, update y remove hago una funcion
// es como un middleware el cual es el que se ejecuta en medio de otros controladores
function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    cita.find(query).then(users => {
        //si no existen users
        if (!users.length) return next();
        // en caso de que si haya , se crea un user en el body (no existia)
        req.body.users = users;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    });
}
//middleware para verificar que el pet si existe antes de ingresar una cita
function findPet(req, res, next) {
    let query = {};
    query["_id"] = req.body.id_pet;
    Pet.find(query).then(users => {
        //si no existen pets
        if (!users.length) return next();
        // en caso de que si haya , se crea un user en el body (no existia)
        req.body.users = users;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    });
}
module.exports = {
    index,
    show,
    create,
    update,
    find,
    findPet
};
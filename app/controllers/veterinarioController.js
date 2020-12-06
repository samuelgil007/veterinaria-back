const Userc = require('../models/veterinario');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


function index(req, res) {
    // busco todos los users y si no da error me devuelve arreglo users
    Userc.find({}).then(users => {
        // si hay usuarios envio codigo de aceptacion y un cuerpo con los prdctos
        if (users.length) return res.status(200).send({ users });
        //en caso de que no hayan datos se manda un codigo y un mensaje xD
        return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
}

function create(req, res) {
    //se inicializa una variable con los datos de mi body
    let usuario = new Userc(req.body);

    //guardo con el metodo save el nuevo usuario
    usuario.save().then(user => {
        /* payload = { //se debe meter fecha de entrega
             email: user.email,
             name: user.name,
             _id: user._id,
             role: user.role

         }*/
        //const token = jwt.sign(payload, CONFIG.SECRET_TOKEN); // aca se deberia de poner la duración del token y demas

        /* return res.status(201).send({ user, token });*/
        return res.status(201).send({ user, message: "El usuario fue creado exitosamente" });


    }).catch(error => res.status(500).send({ message: "El usuario ya existe", error }));
}


function show(req, res) {
    if (req.body.error) return res.status(500).send({ message: 'Error del server'  });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found :"V' });
    let users = req.body.users;
    return res.status(200).send({ users });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    let query = {};
    query[req.params.key] = req.params.value;
    let ussuario = req.body.users[0];
    if (req.body.name == undefined || req.body.name == "" || req.body.name == null) {
        req.body.name = ussuario.name;
    }
    if (req.body.imgUrl == undefined || req.body.imgUrl == "" || req.body.imgUrl == null) {
        req.body.imgUrl = ussuario.imgUrl;
    }
    if (req.body.email == undefined || req.body.email == "" || req.body.email == null) {
        req.body.email = ussuario.email;
    }
    if (req.body.phone == undefined || req.body.phone == "" || req.body.phone == null) {
        req.body.phone = ussuario.phone;
    }

    let update = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        email: req.body.email,
        phone: req.body.phone
    };
    Userc.updateOne(query, update, (err, user) => {
        if (err) res.status(500).send({ message: `Error ${err}` })
        res.status(200).send({ message: "Actualizacion correcta" })
    });
}

function updatePassword(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    //Se valida si no hay Users.
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    let ussuario = req.body.users[0];
    if (req.body.password == undefined || req.body.password == "" || req.body.password == null) {
        return res.status(400).send({ error: "Password debe ser diferente de null" })
    }
    //creo un nuevo objeto con las cosas que quiero cambiarle
    ussuario = Object.assign(ussuario, req.body);
    ussuario.save().then(user => res.status(200).send({ message: "Contraseña Actualizada", user })).catch(error => res.status(500).send({ error }));
}

// como buscar se repite en show, update y remove hago una funcion
// es como un middleware el cual es el que se ejecuta en medio de otros controladores
function find(req, res, next) {
    //se hara lo siguiente para entrar por ejemplo (categoria: 'Hogar')
    let query = {};
    query[req.params.key] = req.params.value;
    Userc.find(query).then(users => {
        //si no existen users
        if (!users.length) return next();
        // en caso de que si haya , se crea un user en el body (no existia)
        req.body.users = users;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    });
    // pdta se pone en el body pa poderlo maniobrar en la siguiente funcion desps del find
}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('No posee headers para esta Request');
    }
    const token = req.headers.authorization.split(' ')[1]; // para separar el token de bearer, toma solo el token
    if (token === 'null') {
        return res.status(401).send('no posee token para esta Request');
    }
    jwt.verify(token, CONFIG.SECRET_TOKEN, function(error, decoded) {
        if (error) return res.status(403).send({ message: 'Fallo al decodificar token', error });
        //req.userId = payload._id;
        if (decoded.role == "Doctor") {
            req.body.rol = decoded.role;
            next();
        } else return res.status(401).send('No tiene el rol necesario para esta Request');
    });



}

module.exports = {
    index,
    show,
    create,
    update,
    find,
    verifyToken,
    updatePassword
};
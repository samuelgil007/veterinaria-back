const User = require('../models/veterinario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
//el ciente me pasa por post
//username
//password

function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email }).then(user => { // se puede solo username
        if (!user) res.status(404).send({ message: "El usuario no existe" });
        //si existe, hago mi logica de login
        bcrypt.compare(password, user.password)
            .then(match => {
                if (match) {

                        payload = { //se debe meter fecha de entrega
                            email: user.email,
                            name: user.name,
                            _id: user.id,
                            role: user.role
                        }
                        //acceso con web token npm i jsonwebtoken
                        jwt.sign(payload, CONFIG.SECRET_TOKEN, function (error, token) {
                            if (error) {
                                res.status(500).send({ error });
                            } else {
                                res.status(200).send({ message: "accedido", token, role: payload.role , name: payload.name });
                            }
                        });

                } else {
                    res.status(200).send({ message: "Password mala" }); //no doy acceso
                }

            }).catch(error => { //se le envia tambien el status para mejorar practicas
                console.log(error);
                res.status(500).send({ error });
            });
    }).catch(error => { //este error no es si no existe el username en la db
        console.log(error);
        res.status(500).send({ error });
    });

}

module.exports = {
    login
};
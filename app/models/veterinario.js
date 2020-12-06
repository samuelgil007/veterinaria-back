const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const VeterinarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Doctor",
        enum: [
            "Doctor",
            "Asistente",
            "Cirujano",
            "Peluquero"
        ]
    }

});
// este metodo ejecuta un hook antes de un metodo
VeterinarioSchema.pre('save', function(next) {

    bcrypt.genSalt(10).then(salts => {
        //me encriptara una cadena de caracteres, me devuelve una promesa con el hash , y ese hash lo guardo
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));

});

const Veterinario = mongoose.model('veterinario', VeterinarioSchema);

module.exports = Veterinario;
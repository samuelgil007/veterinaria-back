const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MascotaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id_owner: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true,
        daefault: Date.now()
    },
    type: {
        required: true,
        type: String,
        enum: [
            "Perro",
            "Gato"
        ]
    }

});

const Mascota = mongoose.model('mascota', MascotaSchema);

module.exports = Mascota;
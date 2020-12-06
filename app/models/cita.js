const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CitaSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    activa: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    name_owner: {
        type: String,
        required: true
    },
    id_owner: {
        type: String,
        required: true
    },
    id_pet: {
        type: String,
        required: true
    },
    diagnostico: {
        type: String,
        required: true
    },
    name_vet: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        daefault: Date.now()
    },
    type: {
        required: true,
        type: String,
        enum: [
            "Consulta",
            "Operacion",
            "Estetica"
        ]
    }

});

const Cita = mongoose.model('cita', CitaSchema);

module.exports = Cita;
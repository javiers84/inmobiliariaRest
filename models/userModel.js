var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuariosSchema = new Schema({


    user: {
        type: String,
        required: true,
        unique: true
    },

    mail: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    nombre: {
        type: String,
        required: true
    },

    telefono: {
        type: String,
        required: true
    },

    imagen: {
        type: String
    },

    role: {
        ref: "roles",
        type: Schema.ObjectId,
    }
});

module.exports = mongoose.model('Usuarios', usuariosSchema);
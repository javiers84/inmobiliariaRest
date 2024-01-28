var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioRoles = new Schema({
    nombre: String
});

module.exports = mongoose.model('roles', usuarioRoles);
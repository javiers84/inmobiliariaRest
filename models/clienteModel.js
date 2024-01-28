var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nombre: String,
    domicilio: String,
    ciudad: String,
    provincia: String,
    celular: String,
    mail: String,
    condicion: String,
    idPropiedad: { type: Schema.ObjectId, ref: 'Propiedades' }
});

module.exports = mongoose.model('Cliente', clienteSchema);
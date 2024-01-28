var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var administracionSchema = new Schema({
    inicioContrato: String,
    finContrato: String,
    precioInicial: String,
    ajuste: String,
    porcentajeAjuste: String,
    porcentajeHonorarios: String,
    montoHonorarios: String,
    expensas: String,
    cisi: String,
    sat: String,
    edet: String,
    gasnor: String,
    idPropietario: { type: Schema.ObjectId, ref: 'Cliente' },
    idInquilino: { type: Schema.ObjectId, ref: 'Cliente' }
});

module.exports = mongoose.model('Administracion', administracionSchema);
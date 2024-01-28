var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartelesSchema = new Schema({
    condicion: String,
    idPropietario: { type: Schema.ObjectId, ref: 'Cliente' },
    idInquilino: { type: Schema.ObjectId, ref: 'Cliente' }
});

module.exports = mongoose.model('Carteles', cartelesSchema);
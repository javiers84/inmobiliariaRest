var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var propiedadesSchema = new Schema({
    zona: String,
    codigo: String,
    domicilio: String,
    country: Boolean,
    manzana: String,
    lote: String,
    ciudad: String,
    provincia: String,
    tipoUnidad: String,
    tipoOperacion: String,
    descripcion: String,
    metrosPropios: String,
    metrosTotales: String,
    dormitorios: String,
    banos: String,
    expensas: String,
    antiguedad: String,
    estado: String,
    mapa: String,
    tipoMoneda: String,
    precio: String,
    agua: Boolean,
    luz: Boolean,
    gas: Boolean,
    seguridad: Boolean,
    porteria: Boolean,
    cloacas: Boolean,
    mostrar: Boolean,
    imagen1: String,
    imagen2: String,
    imagen3: String,
    imagen4: String,
    imagen5: String,
    idPropietario: { type: Schema.ObjectId, ref: 'Cliente' }
});

module.exports = mongoose.model('Propiedades', propiedadesSchema);
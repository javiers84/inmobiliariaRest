var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sliderSchema = new Schema({
    imagen: String
});

module.exports = mongoose.model('Slider', sliderSchema);
const { response } = require('express');

const slider = require('../models/sliderModel');

/////// AGREGAR SLIDER
const agregarSlider = async(req, res = response) => {

    var sliders = new slider();

    if (req.body.imagen != "") {
        var imagen = req.body.imagen;

        var fs = require("fs");

        var nombreArchivo = Math.random().toString() + ".jpg";

        sliders.imagen = "upload/" + nombreArchivo;

        fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
            sliders.save((error, respuesta) => {
                if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });

                sliders.imagen = "upload/" + nombreArchivo;

                res.send({ estado: { codigo: 1, respuesta: "operacion agregar slider exitosa " }, sliders: respuesta });
            });
        });
    }
}

/////// BUSCAR SLIDER
const buscarSlider = async(req, res = response) => {

    slider.findById(req.params.id, (err, retorno) => {

        if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion buscar slider por id exitosa " }, sliders: retorno });

    });
}

//////// BUSCAR SLIDERES
const buscarSlideres = async(req, res = response) => {

    slider.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los sliders exitosa" }, sliders: respuesta });
    });
}

//////// ACTUALIZAR SLIDER
const actualizarSlider = async(req, res = response) => {

    slider.findById(req.params.id, (err, retorno) => {
        if (req.body.imagen != "") {
            var imagen = req.body.imagen;
            var fs = require("fs");
            var nombreArchivo = Math.random().toString() + ".jpg";
            retorno.imagen = "upload/" + nombreArchivo;

            fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
                retorno.save((error, respuesta) => {
                    if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                    retorno.imagen = "upload/" + nombreArchivo;
                    res.send({ estado: { codigo: 1, respuesta: "operacion agregar novedad exitosa " }, novedades: respuesta });
                });
            });
        }
    });
}

///////// ELIMINAR SLIDER
const eliminarSlider = async(req, res = response) => {

    slider.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {
            var urlImagen = retorno.imagen;
            var fs = require("fs");
            try {
                fs.unlinkSync("public/" + urlImagen);
                console.log('Archivo eliminado');
            } catch (err) {
                console.error('Ocurrio un error al eliminar el archivo', err);
            }

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar slider exitosa " }, sliders: respuesta });
        });
    });
}

module.exports = {
    agregarSlider,
    buscarSlider,
    buscarSlideres,
    actualizarSlider,
    eliminarSlider
}
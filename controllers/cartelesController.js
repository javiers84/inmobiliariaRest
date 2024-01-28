const { response } = require('express');

const carteles = require('../models/cartelesModel');

///////// AGREGAR CARTEL ///////////////

const agregarCartel = async(req, res = response) => {

    var cartelAdd = new carteles();
    cartelAdd.condicion = req.body.condicion;
    administracionAdd.idPropietario = req.body.idPropietario;
    administracionAdd.idInquilino = req.body.idInquilino;

    cartelAdd.save((error, respuesta) => {
        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion agregar cartel exitosa " }, carteles: respuesta });
    });
}

///////// BUSCAR CARTELES ////////////////
const buscarCarteles = async(req, res = response) => {

    carteles.find({}).populate('idPropietario')
        .populate('idInquilino')
        .exec((error, retorno) => {
            // carteles.find({}, (error, respuesta) => {

            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            res.json({
                ok: true,
                msg: 'carteles encontrados',
                respuesta
            });
            // res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los catalogos exitosa" }, catalogo: respuesta });
        });

}

///////// BUSCAR CARTEL ////////////////
const buscarCartel = async(req, res = response) => {
    const { id } = req.params;
    try {
        const carteles = await carteles.findById(id);
        res.json({
            ok: true,
            msg: 'cartel encontrado',
            carteles
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador de la Web'
        });
    }
}

///////// ACTUALIZAR CARTEL ////////////////
const actualizarCartel = async(req, res = response) => {


    carteles.findById(req.params.id, (err, retorno) => {
        cartelAdd.condicion = req.body.condicion;
        administracionAdd.idPropietario = req.body.idPropietario;
        administracionAdd.idInquilino = req.body.idInquilino;

        retorno.save((error, respuesta) => {
            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion actualizar cartel exitosa " }, carteles: respuesta });
        });
    });
}

/////// ELIMINAR CARTEL
const eliminarCartel = async(req, res = response) => {


    carteles.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar cartel exitosa " }, carteles: respuesta });
        });
    });
}

module.exports = {
    agregarCartel,
    buscarCarteles,
    buscarCartel,
    actualizarCartel,
    eliminarCartel
}
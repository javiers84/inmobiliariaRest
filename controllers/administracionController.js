const { response } = require('express');

const administracion = require('../models/administracionModel');

///////// AGREGAR ADMINISTRACION ///////////////

const agregarAdministracion = async(req, res = response) => {

    var administracionAdd = new administracion();
    administracionAdd.inicioContrato = req.body.inicioContrato;
    administracionAdd.finContrato = req.body.finContrato;
    administracionAdd.precioInicial = req.body.precioInicial;
    administracionAdd.ajuste = req.body.ajuste;
    administracionAdd.porcentajeAjuste = req.body.porcentajeAjuste;
    administracionAdd.porcentajeHonorarios = req.body.porcentajeHonorarios;
    administracionAdd.montoHonorarios = req.body.montoHonorarios;
    administracionAdd.expensas = req.body.expensas;
    administracionAdd.cisi = req.body.cisi;
    administracionAdd.sat = req.body.sat;
    administracionAdd.edet = req.body.edet;
    administracionAdd.gasnor = req.body.gasnor;
    administracionAdd.idPropietario = req.body.idPropietario;
    administracionAdd.idInquilino = req.body.idInquilino;

    administracionAdd.save((error, respuesta) => {
        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion agregar administracion exitosa " }, administracion: respuesta });
    });
}

///////// BUSCAR ADMINISTRACIONES ////////////////
const buscarAdministraciones = async(req, res = response) => {

    administracion.find({})
        .populate('idPropietario')
        .populate('idInquilino')
        .exec((error, retorno) => {
            // administracion.find({}, (error, respuesta) => {

            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            res.json({
                ok: true,
                msg: 'Administraciones encontradas',
                respuesta
            });
            // res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los catalogos exitosa" }, catalogo: respuesta });
        });

}

///////// BUSCAR ADMINISTRACION ////////////////
const buscarAdministracion = async(req, res = response) => {
    const { id } = req.params;
    try {
        const administracion = await administracion.findById(id);
        res.json({
            ok: true,
            msg: 'Administracion encontrada',
            administracion
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador de la Web'
        });
    }
}

///////// ACTUALIZAR ADMINISTRACION ////////////////
const actualizarAdministracion = async(req, res = response) => {


    administracion.findById(req.params.id, (err, retorno) => {
        // retorno.propietario = req.body.propietario;
        // retorno.direccion = req.body.direccion;
        // retorno.ciuddad = req.body.ciudad;
        // retorno.propietario = req.body.provincia;
        // retorno.telPropietario = req.body.telPropietario;
        // retorno.inquilino = req.body.inquilino;
        // retorno.telInquilino = req.body.telInquilino;
        retorno.inicioContrato = req.body.inicioContrato;
        retorno.finContrato = req.body.finContrato;
        retorno.precioInicial = req.body.precioInicial;
        retorno.precioActual = req.body.precioActual;
        retorno.porcentajeHonorarios = req.body.porcentajeHonorarios;
        retorno.montoHonorarios = req.body.montoHonorarios;
        retorno.expensas = req.body.expensas;
        retorno.cisi = req.body.cisi;
        retorno.sat = req.body.sat;
        retorno.edet = req.body.edet;
        retorno.gasnor = req.body.gasnor;
        retorno.idPropietario = req.body.idPropietario;
        retorno.idInquilino = req.body.idInquilino;

        retorno.save((error, respuesta) => {
            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion actualizar administracion exitosa " }, administracion: respuesta });
        });
    });
}

/////// ELIMINAR ADMINISTRACION
const eliminarAdministracion = async(req, res = response) => {


    administracion.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar administracion exitosa " }, administracion: respuesta });
        });
    });
}

module.exports = {
    agregarAdministracion,
    buscarAdministraciones,
    buscarAdministracion,
    actualizarAdministracion,
    eliminarAdministracion
}
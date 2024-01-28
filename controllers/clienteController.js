const { response } = require('express');

const cliente = require('../models/clienteModel');

///////// AGREGAR CLIENTE ///////////////

const agregarCliente = async(req, res = response) => {

    var clienteAdd = new cliente();
    clienteAdd.nombre = req.body.nombre;
    clienteAdd.domicilio = req.body.domicilio;
    clienteAdd.ciudad = req.body.ciudad;
    clienteAdd.provincia = req.body.provincia;
    clienteAdd.celular = req.body.celular;
    clienteAdd.mail = req.body.mail;
    clienteAdd.condicion = req.body.condicion;
    clienteAdd.idPropiedad = req.body.idPropiedad;


    clienteAdd.save((error, respuesta) => {
        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion agregar cliente exitosa " }, cliente: respuesta });
    });
}

///////// BUSCAR CLIENTES ////////////////
const buscarClientes = async(req, res = response) => {

    cliente.find({})
        .populate('idPropiedad')
        .exec((error, retorno) => {
            // administracion.find({}, (error, respuesta) => {

            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            // res.json({
            //     ok: true,
            //     msg: 'clientes encontrados',
            //     cliente
            // });
            res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los clientes exitosa" }, clientes: retorno });
        });

}

///////// BUSCAR CLIENTE ////////////////
const buscarCliente = async(req, res = response) => {
    cliente.findById(req.params.id, (err, retorno) => {

        if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion buscar cliente por id exitosa " }, cliente: retorno });

    });
}

///////// ACTUALIZAR CLIENTE ////////////////
const actualizarCliente = async(req, res = response) => {


    cliente.findById(req.params.id, (err, retorno) => {
        retorno.nombre = req.body.nombre;
        retorno.domicilio = req.body.domicilio;
        retorno.ciudad = req.body.ciudad;
        retorno.provincia = req.body.provincia;
        retorno.celular = req.body.celular;
        retorno.mail = req.body.mail;
        retorno.condicion = req.body.condicion;
        retorno.idPropiedad = req.body.idPropiedad;

        retorno.save((error, respuesta) => {
            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion actualizar cliente exitosa " }, cliente: respuesta });
        });
    });
}

/////// ELIMINAR CLIENTE
const eliminarCliente = async(req, res = response) => {


    cliente.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar cliente exitosa " }, cliente: respuesta });
        });
    });
}

module.exports = {
    agregarCliente,
    buscarClientes,
    buscarCliente,
    actualizarCliente,
    eliminarCliente
}
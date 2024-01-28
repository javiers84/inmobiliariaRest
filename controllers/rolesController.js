const { response } = require('express');

const roles = require('../models/roles');

///////// AGREGAR ROLES ///////////////
const agregarRole = async(req, res = response) => {

    var roleAdd = new roles();
    roleAdd.nombre = req.body.nombre;


    roleAdd.save((error, respuesta) => {
        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion agregar role exitosa " }, role: respuesta });
    });
}

///////// BUSCAR ROLES ////////////////
const buscarRoles = async(req, res = response) => {

    roles.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los roles exitosa" }, roles: respuesta });
    });

}

///////// BUSCAR ROLE ////////////////
const buscarRole = async(req, res = response) => {
    roles.findById(req.params.id, (err, retorno) => {

        if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion buscar role por id exitosa " }, role: retorno });

    });
}

///////// ACTUALIZAR ROLE ////////////////
const actualizarRole = async(req, res = response) => {


    roles.findById(req.params.id, (err, retorno) => {
        retorno.nombre = req.body.nombre;

        retorno.save((error, respuesta) => {
            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion actualizar role exitosa " }, role: respuesta });
        });
    });
}

/////// ELIMINAR ROLE
const eliminarRole = async(req, res = response) => {


    roles.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar role exitosa " }, role: respuesta });
        });
    });
}

module.exports = {
    agregarRole,
    buscarRoles,
    buscarRole,
    actualizarRole,
    eliminarRole
}
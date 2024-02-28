const { response } = require('express');

const propiedad = require('../models/propiedadesModel');

///////// AGREGAR PROPIEDAD ///////////////

const agregarPropiedad = async(req, res = response) => {

    console.log('entramos en el agregar propiedades del controller')

    var propiedadesAdd = new propiedad();
    propiedadesAdd.zona = req.body.zona;
    propiedadesAdd.codigo = req.body.codigo;
    propiedadesAdd.domicilio = req.body.domicilio;
    propiedadesAdd.country = req.body.country;
    propiedadesAdd.manzana = req.body.manzana;
    propiedadesAdd.lote = req.body.lote;
    propiedadesAdd.ciudad = req.body.ciudad;
    propiedadesAdd.provincia = req.body.provincia;
    propiedadesAdd.tipoUnidad = req.body.tipoUnidad;
    propiedadesAdd.tipoOperacion = req.body.tipoOperacion;
    propiedadesAdd.descripcion = req.body.descripcion;
    propiedadesAdd.metrosPropios = req.body.metrosPropios;
    propiedadesAdd.metrosTotales = req.body.metrosTotales;
    propiedadesAdd.dormitorios = req.body.dormitorios;
    propiedadesAdd.banos = req.body.banos;
    propiedadesAdd.expensas = req.body.expensas;
    propiedadesAdd.antiguedad = req.body.antiguedad;
    propiedadesAdd.estado = req.body.estado;
    propiedadesAdd.mapa = req.body.mapa;
    propiedadesAdd.tipoMoneda = req.body.tipoMoneda;
    propiedadesAdd.precio = req.body.precio;
    propiedadesAdd.agua = req.body.agua;
    propiedadesAdd.luz = req.body.luz;
    propiedadesAdd.gas = req.body.gas;
    propiedadesAdd.seguridad = req.body.seguridad;
    propiedadesAdd.porteria = req.body.porteria;
    propiedadesAdd.cloacas = req.body.cloacas;
    propiedadesAdd.idPropietario = req.body.idPropietario;

    if (req.body.imagen1 != "" && req.body.imagen2 != "" && req.body.imagen3 !=
        "" && req.body.imagen4 != "" && req.body.imagen5 != "") {
        var imagen1 = req.body.imagen1;
        var imagen2 = req.body.imagen2;
        var imagen3 = req.body.imagen3;
        var imagen4 = req.body.imagen4;
        var imagen5 = req.body.imagen5;
        var fs = require("fs");
        var nombreArchivo1 = Math.random().toString() + ".jpg";
        var nombreArchivo2 = Math.random().toString() + ".jpg";
        var nombreArchivo3 = Math.random().toString() + ".jpg";
        var nombreArchivo4 = Math.random().toString() + ".jpg";
        var nombreArchivo5 = Math.random().toString() + ".jpg";
        propiedadesAdd.imagen1 = "upload/" + nombreArchivo1;
        propiedadesAdd.imagen2 = "upload/" + nombreArchivo2;
        propiedadesAdd.imagen3 = "upload/" + nombreArchivo3;
        propiedadesAdd.imagen4 = "upload/" + nombreArchivo4;
        propiedadesAdd.imagen5 = "upload/" + nombreArchivo5;

        fs.writeFile("public/upload/" + nombreArchivo1, imagen1, 'base64', (error) => {
            fs.writeFile("public/upload/" + nombreArchivo2, imagen2, 'base64', (error) => {
                fs.writeFile("public/upload/" + nombreArchivo3, imagen3, 'base64', (error) => {
                    fs.writeFile("public/upload/" + nombreArchivo4, imagen4, 'base64', (error) => {
                        fs.writeFile("public/upload/" + nombreArchivo5, imagen5, 'base64', (error) => {
                            propiedadesAdd.save((error, respuesta) => {
                                if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                                propiedadesAdd.imagen1 = "upload/" + nombreArchivo1;
                                propiedadesAdd.imagen2 = "upload/" + nombreArchivo2;
                                propiedadesAdd.imagen3 = "upload/" + nombreArchivo3;
                                propiedadesAdd.imagen4 = "upload/" + nombreArchivo4;
                                propiedadesAdd.imagen5 = "upload/" + nombreArchivo5;
                                res.send({ estado: { codigo: 1, respuesta: "operacion agregar propiedad exitosa " }, propiedades: respuesta });
                            });
                        });
                    });
                });
            });
        });
    }
}

///////// BUSCAR PROPIEDADES ////////////////
const buscarPropiedades = async(req, res = response) => {

    propiedad.find({}).populate('idPropietario').exec((error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        // res.json({
        //     ok: true,
        //     msg: 'propiedades encontradas',
        //     respuesta
        // });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los catalogos exitosa" }, propiedades: respuesta });
    });

}

///////// BUSCAR PROPIEDAD ////////////////
const buscarPropiedad = async(req, res = response) => {

    propiedad.findById(req.params.id).populate('idPropietario').exec((err, retorno) => {
    
        if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion buscar propiedad por id exitosa " }, propiedad: retorno }).headersSent;
    });
}



// const { id } = req.params;
// try {
//     const propiedad = await propiedad.findById(id).populate('idPropietario');
//     res.json({
//         ok: true,
//         msg: 'Propiedad encontrada',
//         propiedad
//     });
// } catch (error) {
//     res.status(500).json({
//         ok: false,
//         msg: 'Hable con el Administrador de la Web'
//     });
// }
// }

///////// ACTUALIZAR PROPIEDAD ////////////////
const actualizarPropiedad = async(req, res = response) => {


    propiedad.findById(req.params.id, (err, retorno) => {
        retorno.zona = req.body.zona;
        retorno.codigo = req.body.codigo;
        retorno.domicilio = req.body.domicilio;
        retorno.country = req.body.country;
        retorno.manzana = req.body.manzana;
        retorno.lote = req.body.lote;
        retorno.ciudad = req.body.ciudad;
        retorno.provincia = req.body.provincia;
        retorno.tipoUnidad = req.body.tipoUnidad;
        retorno.tipoOperacion = req.body.tipoOperacion;
        retorno.descripcion = req.body.descripcion;
        retorno.metrosPropios = req.body.metrosPropios;
        retorno.metrosTotales = req.body.metrosTotales;
        retorno.dormitorios = req.body.dormitorios;
        retorno.banos = req.body.banos;
        retorno.expensas = req.body.expensas;
        retorno.antiguedad = req.body.antiguedad;
        retorno.estado = req.body.estado;
        retorno.mapa = req.body.mapa;
        retorno.tipoMoneda = req.body.tipoMoneda;
        retorno.precio = req.body.precio;
        retorno.agua = req.body.agua;
        retorno.luz = req.body.luz;
        retorno.gas = req.body.gas;
        retorno.seguridad = req.body.seguridad;
        retorno.porteria = req.body.porteria;
        retorno.cloacas = req.body.cloacas;
        retorno.idPropietario = req.body.idPropietario;

        if (req.body.imagen1 != "" && req.body.imagen2 != "" && req.body.imagen3 !=
            "" && req.body.imagen4 != "" && req.body.imagen5 != null) {
            var imagen1 = req.body.imagen1;
            var imagen2 = req.body.imagen2;
            var imagen3 = req.body.imagen3;
            var imagen4 = req.body.imagen4;
            var imagen5 = req.body.imagen5;
            var fs = require("fs");
            var nombreArchivo1 = Math.random().toString() + ".jpg";
            var nombreArchivo2 = Math.random().toString() + ".jpg";
            var nombreArchivo3 = Math.random().toString() + ".jpg";
            var nombreArchivo4 = Math.random().toString() + ".jpg";
            var nombreArchivo5 = Math.random().toString() + ".jpg";
            retorno.imagen1 = "upload/" + nombreArchivo1;
            retorno.imagen2 = "upload/" + nombreArchivo2;
            retorno.imagen3 = "upload/" + nombreArchivo3;
            retorno.imagen4 = "upload/" + nombreArchivo4;
            retorno.imagen5 = "upload/" + nombreArchivo5;

            fs.writeFile("public/upload/" + nombreArchivo1, imagen1, 'base64', (error) => {
                fs.writeFile("public/upload/" + nombreArchivo2, imagen2, 'base64', (error) => {
                    fs.writeFile("public/upload/" + nombreArchivo3, imagen3, 'base64', (error) => {
                        fs.writeFile("public/upload/" + nombreArchivo4, imagen4, 'base64', (error) => {
                            fs.writeFile("public/upload/" + nombreArchivo5, imagen5, 'base64', (error) => {
                                retorno.save((error, respuesta) => {
                                    if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                                    retorno.imagen1 = "upload/" + nombreArchivo1;
                                    retorno.imagen2 = "upload/" + nombreArchivo2;
                                    retorno.imagen3 = "upload/" + nombreArchivo3;
                                    retorno.imagen4 = "upload/" + nombreArchivo4;
                                    retorno.imagen5 = "upload/" + nombreArchivo5;
                                    res.send({ estado: { codigo: 1, respuesta: "operacion actualizar propiedad exitosa " }, propiedad: respuesta });
                                });
                            });
                        });
                    });
                });
            });
        }
    });
}

/////// ELIMINAR PROPIEDAD ////////
const eliminarPropiedad = async(req, res = response) => {


    propiedad.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar propiedad exitosa " }, propiedad: respuesta });
        });
    });
}

module.exports = {
    agregarPropiedad,
    buscarPropiedades,
    buscarPropiedad,
    actualizarPropiedad,
    eliminarPropiedad
}
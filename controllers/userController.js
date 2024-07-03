const { response } = require('express');
// const { validationResult } = require('express-validator');

const usuariosModel = require('../models/userModel');
const roles = require('../models/roles');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const { generarJWT } = require('../helpers/jwt');
// const { dbConnection } = require('../db/config');
const jwt = require('express-jwt');


//////// CREAR USUARIO ///////////////
const crearUsuario = async(req, res = response) => {

    var { user, mail, password, nombre, telefono, imagen, role } = req.body;

    try {

        //verificar si existe mail
        let usuario = await usuariosModel.findOne({ mail });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El mail ya existe'
            });
        }

        //crear usuario con el modelo
        const dbUser = new usuariosModel(req.body);

        //hashear la constraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);


        //generar el JWT
        const token = await generarJWT(dbUser.uid, user);
        console.log("token jwt: " + token);


        //asignar role por defecto
        if (role) {
            const buscarRole = await roles.find({ _id: { $in: role } });
            dbUser.role = buscarRole.map(role => role._id);
        } else {
            const rol = await roles.findOne({ nombre: "visitante" });
            dbUser.role = [rol._id];
        }

        //GUARDAR IMAGEN
        // usuariosModel.find({}, (err, retorno) => {
            if (imagen != "") {
                var imagen = imagen;
                var fs = require("fs");
                var nombreArchivo = Math.random().toString() + ".jpg";
                dbUser.imagen = "upload/" + nombreArchivo;
    
                fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
                    // retorno.save((error, respuesta) => {
                    //     if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                    //     retorno.imagen = "upload/" + nombreArchivo;
                    //     res.send({ estado: { codigo: 1, respuesta: "operacion agregar novedad exitosa " }, novedades: respuesta });
                    // });
                });
            }else{}
        // });

        const guardarUser = await dbUser.save();

        // console.log(guardarUser);

        return res.status(201).json({
            ok: true,
            uid: dbUser._id,
            user,
            role: dbUser.role,
            nombre: dbUser.nombre,
            telefono: dbUser.telefono,
            imagen: dbUser.imagen,
            token
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el Administrador'
        });
    }
}

//////// LOGIN USUARIO ///////////////
const loginUsuario = async(req, res = response) => {

    const { user, password, nombre, telefono, foto, role } = req.body;


    try {

        const dbUser = await usuariosModel.findOne({ user }).populate("role");
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o Constraseña incorrectos'
            });
        }

        //CONFIRMAR SI EL PASSWORD HACE MATCH
        const validPass = bcrypt.compareSync(password, dbUser.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o Constraseña incorrectos'
            });
        }

        //GENERAR JWT
        const token = await generarJWT(dbUser._id, user);

        //RESPUESTA DEL SERVICIO

        console.log("Se logueo correctamente" + " " + dbUser._id + " - " + user);
        return res.json({
            ok: true,
            uid: dbUser._id,
            user,
            role: dbUser.role,
            token
        });

    } catch (error) {
        console.log("Error al loguearse: " + error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }












    // const { user, password } = req.body;
    // try {
    //     const dbUser = await usuarios.findOne({ user });

    //     if (!dbUser) {
    //         return res.status(400).json({
    //             ok: false,
    //             error: 'Usuario o contraseña incorrectos'
    //         });
    //     }

    //     /////// COMPARAR CONTRASEÑA 
    //     const validPassword = await bcrypt.compareSync(password, dbUser.password);
    //     if (!validPassword) {
    //         return res.status(400).json({
    //             ok: false,
    //             error: 'Usuario o contraseña incorrectos'
    //         });
    //     }

    //     /////// GENERAR TOKEN 
    //     const token = await generarJWT(dbUser._id, user);

    //     /////// RESPUESTA DEL SERVICIO
    //     return res.json({
    //         ok: true,
    //         uid: dbUser._id,
    //         user,
    //         token
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: "Hable con el Administrador"
    //     });
    // }
}

//////// BUSCAR USUARIOS ///////////////
const buscarUsuarios = async(req, res = response) => {
    
    try {
        // const dbUser = await usuarios.findById(id);
        
        usuariosModel.findBy((err, retorno) => {

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion buscar usuarios exitosa " }, usuarios: retorno });
    
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

//////// BUSCAR USUARIO ///////////////
const buscarUsuario = async(req, res = response) => {
    const { id } = req.params;

    try {
        // const dbUser = await usuarios.findById(id);
        
        usuariosModel.findById(req.params.id, (err, retorno) => {

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion buscar usuario por id exitosa " }, usuario: retorno });
    
        });

        // res.json({
        //     ok: true,
        //     msg: 'Usuario encontrado',
        //     dbUser
        // });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}


//////// VALIDAR TOKEN ///////////////
const validarToken = async(req, res = response) => {
    const { uid, user } = req;

    const token = await generarJWT(uid, user);

    return res.json({
        ok: true,
        msg: 'Operacion validar token OK',
        id: uid,
        usuario: user,
        token
    });
}


///////// RESET PASS ////////////////


module.exports = {
    crearUsuario,
    loginUsuario,
    buscarUsuarios,
    buscarUsuario,
    validarToken
}
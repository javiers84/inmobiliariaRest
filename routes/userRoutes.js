const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, validarToken, buscarUsuario, buscarUsuarios } = require('../controllers/userController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// CREAR USUARIO //////////
router.post('/crear', [
    check('user', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

////// LOGIN USUARIO ///////////////
router.post('/login', [
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

////// BUSCAR USUARIOS ///////////////
router.get('/buscarUsuario', validarCampos, buscarUsuarios);

////// BUSCAR USUARIO ///////////////
router.get('/buscarUsuario/:id', validarCampos, buscarUsuario);

////// VALIDAR TOKEN ///////////////
router.get('/validarToken', validarJWT, validarToken);

////// RESET PASS ///////////////
// router.post( () => {

// });

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { agregarAdministracion, buscarAdministraciones, buscarAdministracion, actualizarAdministracion, eliminarAdministracion } = require('../controllers/administracionController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR ADMINISTRACION ///////////////
router.post('/agregarAdministracion', [
    check('idPropietario', 'El id del propietario es obligatorio').not().isEmpty(),
], validarCampos, agregarAdministracion);

////// BUSCAR ADMINISTRACIONES ////////////////
router.get('/buscarAdministraciones', buscarAdministraciones);

////// BUSCAR ADMINISTRACION ////////////////
router.get('/buscarAdministracion/:id', buscarAdministracion);

////// ACTUALIZAR ADMINISTRACION ///////////////
router.put('/actualizarAdministracion/:id', actualizarAdministracion);

////// ELIMINAR ADMINISTRACION ///////////////
router.delete('/eliminarAdministracion/:id', eliminarAdministracion);

module.exports = router;
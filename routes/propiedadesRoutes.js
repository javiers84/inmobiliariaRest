const { Router } = require('express');
const { check } = require('express-validator');
const { agregarPropiedad, buscarPropiedades, buscarPropiedad, actualizarPropiedad, eliminarPropiedad } = require('../controllers/propiedadesController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR PROPIEDAD ///////////////
router.post('/agregarPropiedad', [
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
], agregarPropiedad);

////// BUSCAR PROPIEDADES ////////////////
router.get('/buscarPropiedades', buscarPropiedades);

////// BUSCAR PROPIEDAD ////////////////
router.get('/buscarPropiedad/:id', buscarPropiedad);

////// ACTUALIZAR PROPIEDAD ///////////////
router.put('/actualizarPropiedad/:id', actualizarPropiedad);

////// ELIMINAR PROPIEDAD ///////////////
router.delete('/eliminarPropiedad/:id', eliminarPropiedad);

module.exports = router;
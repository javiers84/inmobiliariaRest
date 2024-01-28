const { Router } = require('express');
const { check } = require('express-validator');
const { agregarRole, buscarRoles, buscarRole, actualizarRole, eliminarRole } = require('../controllers/rolesController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR ROLE ///////////////
router.post('/agregarRole', validarCampos, agregarRole);

////// BUSCAR ROLES ////////////////
router.get('/buscarRoles', buscarRoles);

////// BUSCAR ROLE ////////////////
router.get('/buscarRole/:id', buscarRole);

////// ACTUALIZAR ROLE ///////////////
router.put('/actualizarRole/:id', actualizarRole);

////// ELIMINAR ROLE ///////////////
router.delete('/eliminarRole/:id', eliminarRole);

module.exports = router;
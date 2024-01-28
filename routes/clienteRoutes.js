const { Router } = require('express');
const { check } = require('express-validator');
const { agregarCliente, buscarClientes, buscarCliente, actualizarCliente, eliminarCliente } = require('../controllers/clienteController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR CLIENTE ///////////////
router.post('/agregarCliente', [
    check('idPropiedad', 'El id de la propiedad es obligatorio').not().isEmpty(),
], validarCampos, agregarCliente);

////// BUSCAR CLIENTES ////////////////
router.get('/buscarClientes', buscarClientes);

////// BUSCAR CLIENTE ////////////////
router.get('/buscarCliente/:id', buscarCliente);

////// ACTUALIZAR CLIENTE ///////////////
router.put('/actualizarCliente/:id', actualizarCliente);

////// ELIMINAR CLIENTE ///////////////
router.delete('/eliminarCliente/:id', eliminarCliente);

module.exports = router;
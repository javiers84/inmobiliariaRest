const { Router } = require('express');
const { check } = require('express-validator');
const { agregarCartel, buscarCarteles, buscarCartel, actualizarCartel, eliminarCartel } = require('../controllers/cartelesController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR CARTEL ///////////////
router.post('/agregarCartel', [
    check('idPropietario', 'El id del propietario es obligatorio').not().isEmpty(),
], validarCampos, agregarCartel);

////// BUSCAR CARTELES ////////////////
router.get('/buscarCarteles', buscarCarteles);

////// BUSCAR CARTEL ////////////////
router.get('/buscarCartel/:id', buscarCartel);

////// ACTUALIZAR CARTEL ///////////////
router.put('/actualizarCartel/:id', actualizarCartel);

////// ELIMINAR CARTEL ///////////////
router.delete('/eliminarCartel/:id', eliminarCartel);

module.exports = router;
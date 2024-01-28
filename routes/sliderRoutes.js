const { Router } = require('express');
const { check } = require('express-validator');
const { agregarSlider, buscarSlider, buscarSlideres, actualizarSlider, eliminarSlider } = require('../controllers/sliderController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR SLIDER ///////////////
router.post('/agregarSlider', [
    check('imagen', 'La imagen 1 es obligatoria').not().isEmpty()
], validarCampos, agregarSlider);

/////// BUSCAR SLIDER ///////////////
router.get('/buscarSlider/:id', buscarSlider);

/////// BUSCAR SLIDERES ///////////////
router.get('/buscarSlideres', buscarSlideres);

/////// ACTUALIZAR SLIDER ///////////////
router.put('/actualizarSlider/:id', [
    check('imagen', 'La imagen 1 es obligatoria').not().isEmpty()
], validarCampos, actualizarSlider);

/////// ELIMINAR SLIDER ///////////////
router.delete('/eliminarSlider/:id', eliminarSlider);

module.exports = router;
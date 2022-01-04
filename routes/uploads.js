const {Router} = require('express');
const {check} = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImg } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarJWT, validarArchivo } = require('../middlewares');

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
  validarArchivo,
  check('id', 'no es un id valido').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
  check('id', 'no es un id valido').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], mostrarImg);


module.exports = router;
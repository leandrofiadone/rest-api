const {Router} = require('express');
const {check} = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarJWT } = require('../middlewares/index');

const router = Router();

router.post('/', [
  // validarJWT,
  // validarCampos
],cargarArchivo);

router.put('/:coleccion/:id', [
  check('id', 'no es un id valido').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], actualizarImagen);


module.exports = router;
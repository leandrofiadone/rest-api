const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, 
        crearProductos, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT,validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// obtener todos los productos
router.get('/', obtenerProductos);

// obtener producto por id
router.get('/:id', [
  check('id', 'no es un id de mongo').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
],obtenerProducto);

// crear producto
router.post('/',[
  validarJWT,
  check('nombre', 'el nombre es requerido').not().isEmpty(),
  check('categoria', 'no es un id de mongo').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
  validarCampos
] ,crearProductos);

// actualizar producto
router.put('/:id',[
  validarJWT,
  check('id', 'no es un id de mongo').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
] ,actualizarProducto)

// borrar producto
router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id', 'no es un id de mongo').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
] ,borrarProducto)


module.exports = router;
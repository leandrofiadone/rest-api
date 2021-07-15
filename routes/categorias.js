const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT,validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// api {{url}}/api/categorias


// obtener todas las categorias -- publico
router.get('/', obtenerCategorias);

// obtener una categorias por id -- publico
router.get('/:id', [
  check('id', 'no es un id valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria)

// crear una categorias -- privado -- cualquier persona con un token valido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria)

// actualizar una categoria -- privado -- requiere token valido
router.put('/:id', [
  validarJWT,
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
],actualizarCategoria)

// borrar categoria -- privado - requiere token -- solo cambiar el estado
router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id', 'no es un id de mongo valido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
] ,borrarCategoria)

module.exports = router;
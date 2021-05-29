const { Router } = require('express');
// el check es el encargado de verificar cada campo, si encuenta errores se los pasa al validarCampo, este decide si dejar continuar el flujo de la app o cortar y mostrar los errores
const { check } = require('express-validator');


// importaciones de los controladores de cada ruta
const { 
   userGet, 
   userPost, 
   userDelete, 
   userPut, 
   userPatch } = require('../controllers/user');
   
// validarCampo atrapa los errores que le mando el check, si hay erroes es el encargado de mostrar los errores, o si esta todo  ok, deja pasar la app
const { validarCampo } = require('../middleware/validar-campo');
const { esRolValido, esEmailValido, existeUserId } = require('../helpers/db-validators');
   
const router = Router();

// peticion get
router.get( '/', userGet )

// peticion post
router.post( '/',[
   // name: verificamos que este no vaya vacio .not().isEmpty() -> se encarga de verificar que no vaya vacio
   check( 'name', 'this name is required').not().isEmpty(),
   // password: Verifica que debe tener minimo 6 caracteres
   check( 'password', 'this Password is required').isLength({min: 6}),
   // email: verifica que debe ser un email.
   check( 'email', 'is Email not is valid').isEmail(),
   check( 'email').custom( esEmailValido ),
   // role: verifica que lo que mandemos en ese capo tiene que estar en el arreglo. en este caso o es ADMIN_ROLE o USER_ROLE
   // check( 'role', 'This Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   check('role').custom( esRolValido ),
   // validarCamp: por ultimo y como se explico arriba, validarCampo se encarga de atrapar todos los erroes para despues ser mostrado o dejar continuar el flujo de la aplicacion.
   validarCampo
] ,userPost );

// peticion delete
router.delete( '/:id',[
   check('id', 'no es un id valido').isMongoId(),
   check('id').custom( existeUserId ),
   validarCampo
] ,userDelete );

// peticion put
router.put( '/:id',[
   check('id', 'no es un id valido').isMongoId(),
   check('id').custom( existeUserId ),
   check('role').custom( esRolValido ),
   validarCampo
] ,userPut);

// peticion patch
router.patch( '/', userPatch );


module.exports = router;
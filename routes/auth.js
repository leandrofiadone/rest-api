const {Router} = require('express');
const {check} = require('express-validator');
const login = require('../controllers/login');
const { validarCampo } = require('../middleware/validar-campo');

const router = Router();

router.post('/login',[
  check('email', 'el email es obligatorio').isEmail(),
  check('password', 'el password es obligatorio').not().isEmpty(),
  validarCampo
] ,login);


module.exports = router;
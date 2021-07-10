const validarCampo = require('../middleware/validar-campo');
const validarJWT = require('../middleware/validar-jwt');
const validarRoles = require('../middleware/validar-roles');

module.exports = {
  ...validarCampo,
  ...validarJWT,
  ...validarRoles
}
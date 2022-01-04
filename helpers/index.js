const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');
const googleVerify = require('./google-verify');

module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...googleVerify
}
const Role = require('../models/role');
const User = require('../models/User');

const esRolValido = async( role = '' ) => {
   const existeRol = await Role.findOne({ role });
   if( !existeRol ){
      throw new Error(`El rol ${role} no esta registrado en la base de datos`)
   }
}

const esEmailValido = async(email = '') => {
   const existeEmail = await User.findOne({ email });
   if( existeEmail ){
      throw new Error(`El email ${email} ya existe en la db`)
   };
}

const existeUserId = async(id = '') => {
   const existeId = await User.findById( id );
   if( !existeId ){
      throw new Error(`El id ${id} no existe en la db`)
   };
}

module.exports = {
   esRolValido,
   esEmailValido,
   existeUserId
}
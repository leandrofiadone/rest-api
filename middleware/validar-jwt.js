const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const validarJWT = async(req = request, res = response, next) => {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      msg: 'no hay token en la peticion'
    });
  };

  try {
    
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde el udi
    const usuario = await User.findById(uid);

    if( !usuario ){
      return res.status(401).json({
        msg: 'token no valido -- usuario no existe en ls db'
      })
    }

    // verificar si el uid esta en false
    if( !usuario.estado ){
      return res.status(401).json({
        msg: 'token no valido -- user in false'
      })
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'token no valido'
    })
  }

}

module.exports = {
  validarJWT
}
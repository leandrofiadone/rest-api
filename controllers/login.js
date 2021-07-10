const { response } = require("express");
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req, res = response) => {

  const {email, password} = req.body;

  try {

    //verificar si el email existe
    const user = await User.findOne({email});
    if( !user ){
      return res.status(400).json({
        msg: "usuario / password no son correctos - correo"
      })
    }
    // virificar si esta activo
    if( !user.estado ){
      return res.status(400).json({
        msg: 'usuario / password no son correctos - estado'
      })
    }

    //verificar la contraseña
    const validarPassword = bcryptjs.compareSync(password, user.password);
    if( !validarPassword ) {
      return res.status(400).json({
        msg: "usuario / password no son correctos - password"
      })
    }

    // generar jwt
    const token = await generarJWT(user.id);

    res.json({
      user,
      token
    })
    
    
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Hable con el admministrador'
    })
  }

};

module.exports = login;
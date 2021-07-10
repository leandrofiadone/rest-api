const { request, response } = require("express")


const esAdminRole = (req = request, res = response, next) => {

  if(!req.usuario){
    return res.status(500).json({
      msg: 'se quiere verificar el rol sin verificar el toke primero'
    })
  }

  const {role, name} = req.usuario;

  if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} no es administrador`
    })
  }

  next();
}

const tieneRole = ( ...roles ) => {

  return (req, res = response, next) => {

    if(!req.usuario){
      return res.status(500).json({
        msg: 'se quiere verificar el rol sin verificar el toke primero'
      });
    };

    if(!roles.includes(req.usuario.role)){
      return res.status(401).json({
        msg: `tiene que tener alguno de los siguientes roles: ${roles}`
      })      
    }

    next();
  };

};

module.exports = {
  esAdminRole,
  tieneRole
}
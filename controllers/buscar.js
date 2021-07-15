const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas = [
  'usuarios',
  'categoria',
  'productos',
  'roles'
];

const buscarUsuarios = async(termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if( esMongoId ){
    const usuario = await Usuario.findById(termino);
    res.json({
      results: (usuario)?[usuario]:[]
    })
  }

  const regex = new RegExp(termino, 'i');

  const usuario = await Usuario.find({
    $or: [{nombre: regex}, {correo: regex}],
    $and: [{estado: true}]
  });

  res.json({
    results: usuario
  })
}

const buscarCategoria = async(termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if( esMongoId ){
    const categoria = await Categoria.findById(termino);
    res.json({
      results: (categoria)?[categoria]:[]
    })
  }

  const regex = new RegExp(termino, 'i');

  const categoria = await Categoria.find({nombre: regex, estado: true});

  res.json({
    results: categoria
  })
}

const buscarProductos = async(termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if( esMongoId ){
    const producto = await Producto.findById(termino)
                      .populate('categoria', 'nombre');
    res.json({
      results: (producto)?[producto]:[]
    })
  }

  const regex = new RegExp(termino, 'i');

  const producto = await Producto.find({nombre: regex, estado: true})
                    .populate('categoria', 'nombre');

  res.json({
    results: producto
  })
}


const buscar = (req, res = response) => {

  const {coleccion, termino} = req.params;

  if(!coleccionesPermitidas.includes(coleccion)){
    return res.status(400).json({
      msg: `las colecciones permitidas son ${coleccionesPermitidas}`
    })
  }

  switch(coleccion){
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    
    case 'categoria':
      buscarCategoria(termino, res);
      break;

    case 'productos':
      buscarProductos(termino, res)
      break;

    default: 
      res.status(500).json({
        msg: 'se le olvido hacer esta busqueda'
      })
  }
}

module.exports = {
  buscar
}
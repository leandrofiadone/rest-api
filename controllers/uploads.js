const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const {Usuario, Producto} = require('../models');

const cargarArchivo = async(req, res=response) => {

  try {
    const nombre = await subirArchivo(req.files, ['jpg','png'], 'jpgs');
    res.json({nombre})
  } catch (msg) {
    res.status(400).json({msg});
  }

};

// COMO SUBIR UN ARCHIVO FISICO AL SERVIDOR
// const actualizarImagen = async(req, res=response) => {

//   const {id, coleccion} = req.params;

//   let modelo;

//   switch (coleccion) {
//     case 'usuarios':
//       modelo = await Usuario.findById(id);
//       if(!modelo){
//         return res.status(400).json({
//           msg: `No existe un usuario con el id ${id}`
//         })
//       }  
//     break;

//     case 'productos':
//       modelo = await Producto.findById(id);
//       if(!modelo){
//         return res.status(400).json({
//           msg: `No existe un producto con el id ${id}`
//         })
//       }  
//     break;
  
//     default:
//       return res.status(500).json({msg: 'se me olvido validar esto'})
//   }

//   // limpiar imagenes previas
//   if(modelo.img){
//     // si existe la imagen la borramos del servidor
//     const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img);
//     if(fs.existsSync(pathImg)){
//       fs.unlinkSync(pathImg);
//     }
//   }

//   const nombre = await subirArchivo(req.files, undefined, coleccion);
//   modelo.img = nombre;

//   await modelo.save();

//   res.json({
//     modelo
//   })

// }

const actualizarImagen = async(req, res=response) => {

  const {id, coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }  
    break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }  
    break;
  
    default:
      return res.status(500).json({msg: 'se me olvido validar esto'})
  }

  // limpiar imagenes previas
  if(modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    cloudinary.uploader.destroy(public_id);    
  }

  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;

  await modelo.save();

  res.json({
    modelo
  })

}

const mostrarImg = async(req, res= response) => {
  const {id, coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }  
    break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }  
    break;
  
    default:
      return res.status(500).json({msg: 'se me olvido validar esto'})
  }

  // limpiar imagenes previas
  if(modelo.img){
    // si existe la imagen la borramos del servidor
    const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImg)){
      return res.sendFile(pathImg);
    }
  }

  const pathImg = path.join( __dirname, '../assets', 'no-image.jpg');
  if(fs.existsSync(pathImg)){
    return res.sendFile(pathImg)
  }

};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImg
};
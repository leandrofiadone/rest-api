// esta importación, es solo para que tengaos ayuda de vsc con la response
const { response } = require('express');

// bcryptjs sirve para emcriptar la contraseña
const bcryptjs = require('bcryptjs');

// este es el modelo de la db.
const User = require('../models/User');

const userGet = async( req, res = response) => {
   const { limit = 5, desde = 0 } = req.query;
   const query = {estado: true};

   const [ total, users ] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
         .skip( Number(desde))
         .limit( Number(limit))
   ]);

   res.json({
      total, 
      users
   });
};

const userPost = async(req, res) => {
   
   // atrapamos los campos que queremos guardar en la db
   const { name, email, password, role } = req.body;

   // insertamos los campos en la db
   const user = new User({ name, email, password, role });
   

   // encriptar password
   // el genSaltSync sirve para defiinir el numero de vueltas que tendra la clave encritada, entre mas numero de vueltas tenga el password sera mas seguro, pero a su vez el proceso sera mas lento 
   const salt = bcryptjs.genSaltSync();
   
   // el hashSync sirve para encriptar la constraseña
   user.password = bcryptjs.hashSync( password, salt );


   // save in db
   await user.save();

   res.json({
      user
   });
};

const userDelete = async(req, res) => {

   const {id} = req.params;

   // borrar fisicamente
   // const user = await User.findByIdAndDelete(id);
   const user = await User.findByIdAndUpdate(id, {estado: false})

   res.json({
      user
   });

};

const userPut = async(req, res) => {

   const { id } = req.params;
   const { _id, password, google, email, ...resto } = req.body;

   if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
   }

   const user = await User.findByIdAndUpdate(id, resto);

   res.json(user);
};

const userPatch = (req, res) => {
   res.json({
      msg: 'patch api'
   });
};

module.exports = {
   userGet,
   userPost,
   userDelete,
   userPut,
   userPatch
}
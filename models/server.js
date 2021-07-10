const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {

   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      this.authPath = '/api/auth';
      this.usersPath = '/api/users';

      // conectar db
      this.conectarDB();

      //midleware nota: los middlewares son funciones que añaden funcionalidad al rest-server
      this.middlewares();

      // rutas de mi aplicacion
      this.routes();
   }

   async conectarDB(){
      await dbConnection();
   }

   middlewares(){
      // cors
      this.app.use( cors() );

      // lectura y parseo del body
      this.app.use( express.json() );

      // directorio publico
      this.app.use( express.static('public') )
   }

   routes(){
      this.app.use( this.authPath, require( '../routes/auth' ) );
      this.app.use( this.usersPath, require( '../routes/user' ) );
   };

   listen(){
      this.app.listen( this.port, () => {
         console.log( 'Server On port', this.port );
      })
   }

}

module.exports = Server
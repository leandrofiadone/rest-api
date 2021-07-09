const mongoose = require('mongoose');

const dbConnection = async() => {


   try {
      
      await mongoose.connect( process.env.MONGO_CNN, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      });

   } catch (error) {
      console.log(error);
      throw new Error('no se pudo conectar con mongo');
   }

};


module.exports = dbConnection;
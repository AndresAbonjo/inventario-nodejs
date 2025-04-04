require("dotenv").config(); //paquete que se usa para cargar variables de entorno desde un archivo .env en process.env

module.exports.Config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGOD_URI,
  mongoDbname: process.env.MONGO_DBNAME,
};

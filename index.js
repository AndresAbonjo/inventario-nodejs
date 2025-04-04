const express = require("express"); //poder usar express
const debug = require("debug")("app:main"); //Para no tener que usar Console.log

const { Config } = require("./src/config"); //poder usar las variables globales guardadas en config aquí.
const { ProductsAPI } = require("./src/products");
const { UsersAPI } = require("./src/users");
const { SalesAPI } = require("./src/sales"); //importar el modulo de ventas
const { IndexAPI, NotFoundApi } = require("./src/index"); //importar el modulo de index

const app = express(); //inicializar la aplicacion

app.use(express.json()); //permitir que la aplicacion lea json

var PORT = parseInt(Config.port); //Esto no sale en el curso. Config.port se lee como un string, y se tiene que pasar a INT para que lea bien el 3000, por eso daba error.

// Modulos:
IndexAPI(app); //modulo de index
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app); 
NotFoundApi(app); //modulo de no encontrado

app.listen(PORT, () => {
  //permitir que la aplicacion "escuche" en ese puerto
  debug(`Servidor escuchando en el puerto ${PORT}`);
});

const express = require("express");

const { SalesController } = require("./controller");

const router = express.Router(); //Router sirve para definir rutas independientemente de la aplicacion

module.exports.SalesAPI = (app) => {
  router
    .get("/", SalesController.getSales) //http://Localhost:3000/api/Sales/
    .get("/:id", SalesController.getSalesByUser) //http://Localhost:3000/api/Sales/23
    .post("/", SalesController.createSales)
    .delete("/:id", SalesController.deleteSales); //http://Localhost:3000/api/Sales/23


  app.use("/api/sales", router); //Esto añade todas las rutas anteriores dentro de la app
};

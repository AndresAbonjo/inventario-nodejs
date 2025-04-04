const express = require("express");

const { ProductsController } = require("./controller");

const router = express.Router(); //Router sirve para definir rutas independientemente de la aplicacion

module.exports.ProductsAPI = (app) => {
  router
    .get("/", ProductsController.getProducts) //http://Localhost:3000/api/products/
    .get("/report", ProductsController.generateReport) //http://Localhost:3000/api/products/report
    .get("/:id", ProductsController.getProduct) //http://Localhost:3000/api/products/23
    .post("/", ProductsController.createProducts)
    .put("/:id", ProductsController.updateProducts)
    .delete("/:id", ProductsController.deleteProducts);

  app.use("/api/products", router); //Esto añade todas las rutas anteriores dentro de la app
};

const express = require("express");

const { UsersController } = require("./controller");

const router = express.Router(); //Router sirve para definir rutas independientemente de la aplicacion

module.exports.UsersAPI = (app) => {
  router
    .get("/", UsersController.getUsers) //http://Localhost:3000/api/Users/
    .get("/:id", UsersController.getUser) //http://Localhost:3000/api/Users/23
    .post("/", UsersController.createUsers)
    .put("/:id", UsersController.updateUsers)
    .delete("/:id", UsersController.deleteUsers);

  app.use("/api/users", router); //Esto añade todas las rutas anteriores dentro de la app
};

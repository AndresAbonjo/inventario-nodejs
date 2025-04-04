const createError = require("http-errors");
const debug = require("debug")("app:module-users-controller");

const { UsersService } = require("./services");
const { Response } = require("../common/response");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de Usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Usero ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUsers: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "Usuario agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateUsers: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      }else{
        const updatedId =await UsersService.update(id, body);
        if (updatedId === 0) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, `Usero ${id} actualizado`, updatedId);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const deletedId = await UsersService.deleteUser(id);
      if (deletedId === 0) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Usero ${id} eliminado`, deletedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};

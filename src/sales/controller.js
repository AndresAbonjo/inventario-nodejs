const createError = require("http-errors");
const debug = require("debug")("app:module-users-controller");

const { SalesService } = require("./services");
const { Response } = require("../common/response");


module.exports.SalesController = {
  getSales: async (req, res) => {
    try {
      let sales = await SalesService.getAll();
      Response.success(res, 200, "Lista de sales", sales);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getSalesByUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let sales = await SalesService.getSalesByUser(id);
      if (!sales) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `El usuario ${id} realizó las siguientes ventas:`, sales);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createSales: async (req, res) => {
    try {
      const { productId, userId, cantidad } = req.body;

      if (!productId || !userId || !cantidad) {
        Response.error(res, new createError.BadRequest("Faltan datos"));
      } else {
        const insertedId = await SalesService.createSales(
          productId,
          userId,
          cantidad
        );
        Response.success(res, 201, "Venta agregada", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteSales: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let result = await SalesService.deleteSales(id);
      if (result === 0) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, "Venta eliminada", result);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};

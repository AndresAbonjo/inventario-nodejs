const createError = require("http-errors");
const debug = require("debug")("app:module-products-controller");

const { ProductsService } = require("./services");
const { Response } = require("../common/response");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProducts: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //update
  updateProducts: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      }else{
        const updatedId =await ProductsService.update(id, body);
        if (updatedId === 0) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, `Producto ${id} actualizado`, updatedId);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //delete
  deleteProducts: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const deletedId = await ProductsService.deleteProduct(id);
      if (deletedId === 0) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id} eliminado`, deletedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};

// aqui se gestionan los datos y la comunicacion con la BD

const { ObjectId } = require("mongodb");

const { Database } = require("../database");

const COLLECTION = "sales";
const PRODUCTS_COLLECTION = "products";
const USERS_COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getSalesByUser = async (userId) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(userId);
  const sales = await collection.find({ userId: objectId }).toArray();

  if (!sales || sales.length === 0) {
    Response.error(
      res,
      new createError.NotFound("No se encontraron ventas para este usuario")
    );
  }

  return sales;
};

const createSales = async (productId, userId, cantidad) => {
  if (!ObjectId.isValid(userId)) {
    throw new Error("El userId proporcionado no es válido");
  }
  if (!ObjectId.isValid(productId)) {
    throw new Error("El productId proporcionado no es válido");
  }

  const productCollection = await Database(PRODUCTS_COLLECTION);
  const objectIdProduct = new ObjectId(productId);

  const product = await productCollection.findOne({ _id: objectIdProduct });
  if (!product) {
    throw new Error("Producto no encontrado");
  }

  if (product.cantidad < cantidad) {
    throw new Error("Stock insuficiente para realizar la venta");
  }

  await productCollection.updateOne(
    { _id: objectIdProduct },
    { $inc: { cantidad: -cantidad } }
  );

  const userCollection = await Database(USERS_COLLECTION);
  const objectIdUser = new ObjectId(userId);
  const user = await userCollection.findOne({ _id: objectIdUser });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const salesCollection = await Database(COLLECTION);
  const sale = {
    productId: objectIdProduct,
    userId: objectIdUser,
    cantidad,
    date: new Date(),
  };

  const result = await salesCollection.insertOne(sale);
  return result.insertedId;
};

const deleteSales = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount;
};

module.exports.SalesService = {
  getAll,
  getSalesByUser,
  createSales,
  deleteSales,
};

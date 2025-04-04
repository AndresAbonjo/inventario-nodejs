// aqui se gestionan los datos y la comunicacion con la BD

const { ObjectId } = require("mongodb");

const { Database } = require("../database");
const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  return collection.findOne({ _id: objectId });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

//update
  const update = async (id, product) => {
    const collection =await Database(COLLECTION);
    const objectId = new ObjectId(id);
    let result =await collection.updateOne(
      { _id: objectId },
      { $set: product }
    );
    return result.modifiedCount;
  }
//delete
const deleteProduct = async (id)=>{
  const collection =await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let result =await collection.deleteOne({ _id: objectId });
  return result.deletedCount;
}

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  generateReport,
  update,
  deleteProduct,
};

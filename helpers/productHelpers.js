const db = require("../config/connection");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection("products")
      .insertOne(product)
      .then((data) => {
        // console.log(data);
        callback(data.ops[0]);
      });
  },
  getProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db.get().collection("products").find().toArray();
      resolve(products);
    });
  },
  deleteProduct: (productId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection("products")
        .removeOne({ _id: ObjectId(productId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getProductDetails: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("products")
        .findOne({ _id: ObjectId(proId) })
        .then((product) => {
          resolve(product);
        });
    });
  },
  updateProduct: (proId, productDetails) => {
    console.log("PRODUCT ID _________", proId);
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection("products")
        .updateOne(
          { _id: ObjectId(proId) },
          {
            $set: {
              Name: productDetails.Name,
              Category: productDetails.Category,
              Price: productDetails.Price,
              Offer: productDetails.Offer,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
};

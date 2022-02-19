const db = require("../config/connection");
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
};

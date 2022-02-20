const db = require("../config/connection");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  doSignUp: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.Password = await bcrypt.hash(userData.Password, 10);
      db.get()
        .collection("users")
        .insertOne(userData)
        .then((response) => {
          resolve(response.ops[0]);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let email = userData.Email;
      let loginStatus = false;
      let response = {};
      let user = await db.get().collection("users").findOne({ Email: email });
      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((valid) => {
          if (valid) {
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("Invalid Password");
            loginStatus = false;
            resolve({ status: false });
          }
        });
      } else {
        console.log("Not user ");
        loginStatus = false;
        resolve({ status: false });
      }
    });
  },
  addToCart: (productId, userId) => {
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection("cart")
        .findOne({ user: userId });
      if (userCart) {
      } else {
        let cartObj = {
          user: ObjectId(userId),
          products: [ObjectId(productId)],
        };
        db.get()
          .collection("cart")
          .insertOne(cartObj)
          .then((response) => {
            resolve(response);
          });
      }
    });
  },
};

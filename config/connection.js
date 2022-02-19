const mongoClient = require("mongodb").MongoClient;

const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url = "mongodb://localhost:27017";
  const dbName = "ecommerce";
  mongoClient.connect(url, function (err, data) {
    if (err) throw err;
    state.db = data.db(dbName);
    done();
  });
};
module.exports.get = function () {
  return state.db;
};

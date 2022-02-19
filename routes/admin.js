var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  let products = productHelper.getProducts().then((products) => {
    console.log("PRODUCTS_________", products);
    res.render("admin/viewProducts", { admin: true, products });
  });
});
router.get("/add-product", (req, res) => {
  res.render("admin/addProduct");
});

router.post("/add-product", (req, res) => {
  productHelper.addProduct(req.body, (result) => {
    let Image = req.files.Image;
    let id = result._id;
    Image.mv("./public/product-images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render("admin/addProduct");
      } else {
        console.log("ERR: ", err);
      }
    });
  });
});
module.exports = router;

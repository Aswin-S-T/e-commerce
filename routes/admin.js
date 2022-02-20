var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  let products = productHelper.getProducts().then((products) => {
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
        res.render("admin/viewProducts");
      } else {
        console.log("ERR: ", err);
      }
    });
  });
});
router.get("/delete-product/:id", (req, res) => {
  let id = req.params.id;
  productHelper.deleteProduct(id).then((result) => {
    res.render("admin/viewProducts");
  });
});

router.get("/edit-product/:id", async (req, res) => {
  let id = req.params.id;
  console.log("ID*******", id);
  let product = await productHelper.getProductDetails(id);
  console.log("PRODUCT : ", product);
  res.render("admin/editProduct", { product });
});

router.post("/edit-product/:id", (req, res) => {
  let id = req.params.id;

  productHelper.updateProduct(id, req.body).then((result) => {
    res.redirect("/admin");
    if (req.files.Image) {
      let image = req.files.Image;
      image.mv("./public/product-images/" + id + ".jpg");
    }
  });
});

module.exports = router;

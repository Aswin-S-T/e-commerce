var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelpers");
var userHelper = require("../helpers/userHelpers");

//Middleware
function varifyLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

/* GET home page. */
router.get("/", function (req, res, next) {
  let user = req.session.user;
  let products = productHelper.getProducts().then((products) => {
    res.render("users/viewProducts", { admin: false, products, user });
  });
});
router.get("/signup", (req, res) => {
  res.render("users/signup");
});
router.get("/login", (req, res) => {
  res.render("users/login");
});
router.post("/signup", (req, res) => {
  console.log(req.body);

  userHelper.doSignUp(req.body).then((response) => {
    req.session.loggedIn = true;
    req.session.user = response;
    res.redirect("/");
  });
});

router.post("/login", (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status == true) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/cart", varifyLogin, async (req, res) => {
  let userId = req.session.user._id;
  let cartProducts = await userHelper.getCartProducts(userId);
  console.log("cart products*********", cartProducts);
  res.render("users/cart", { cartProducts });
});

router.get("/add-to-cart/:id", varifyLogin, (req, res) => {
  let productId = req.params.id;
  let userId = req.session.user._id;
  userHelper.addToCart(productId, userId).then((response) => {
    console.log("Response_________", response);
    res.redirect("/");
  });
});

module.exports = router;

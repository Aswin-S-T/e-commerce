var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/productHelpers");
var userHelper = require("../helpers/userHelpers");

/* GET home page. */
router.get("/", function (req, res, next) {
  let user = req.session.user;
  console.log("USER : ", user);
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
    console.log("RESPONSE________", response);
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

module.exports = router;

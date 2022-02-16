var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let products = [
    {
      _id: "1",
      name: "Fit Slim Shirt",
      image: "https://m.media-amazon.com/images/I/71aQIPEiPwL._UL1500_.jpg",
      category: "Shirt",
      price: 879,
      offer: 10,
    },
    {
      _id: "2",
      name: "Addidas Shirt",
      image: "https://m.media-amazon.com/images/I/71VLHEtZ72L._UL1500_.jpg",
      category: "Shirt",
      price: 999,
      offer: 21,
    },
    {
      _id: "3",
      name: "Nike Shirt",
      image: "https://m.media-amazon.com/images/I/81OcoSYB11L._UL1500_.jpg",
      category: "Shirt",
      price: 729,
      offer: 21,
    },
    {
      _id: "4",
      name: "Allen Solly Shirt",
      image: "https://m.media-amazon.com/images/I/71R53AbAg0L._UL1500_.jpg",
      category: "Shirt",
      price: 729,
      offer: 21,
    },
  ];
  res.render("index", { products, admin: false });
});

module.exports = router;

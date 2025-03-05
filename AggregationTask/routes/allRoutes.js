const express = require("express");
const router = express.Router();
// all function related to products
const productsController = require("../controllers/productController");

// get 
router.get("/getproducts",productsController.getproducts);

// post api to check the available quantity
router.post('/buyProducts',productsController.buyProducts);

// get data from diff collections
router.get("/getproductsData",productsController.getProducts);

// place order 
router.post('/placeOrder',productsController.placeOrder);

module.exports= router;
const express = require("express");
const productController = require("./../Controllers/productsController");
const authJWT = require("../Middleware/authJWT");
const router = express.Router();
const image = require("../Middleware/imageProducts");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authJWT.verifyToken,
    image.single("image"),
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProductById)
  .patch(authJWT.verifyToken, productController.updateProduct)
  .delete(authJWT.verifyToken, productController.deleteProduct);
module.exports = router;

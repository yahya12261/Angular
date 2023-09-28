const express = require("express");
const categoriesConroller = require("../Controllers/categoriesController");
const authJWT = require("../Middleware/authJWT");
const router = express.Router();
const multer = require("multer");
const upload = multer().none();
router
  .route("/")
  .get(categoriesConroller.getAllcategories)
  .post(upload, authJWT.verifyToken, categoriesConroller.createCategory);

router
  .route("/:id")
  .get(categoriesConroller.getCategoryFromId)
  .patch(authJWT.verifyToken, categoriesConroller.updateCategory)
  .delete(authJWT.verifyToken, categoriesConroller.deleteCategory);
module.exports = router;

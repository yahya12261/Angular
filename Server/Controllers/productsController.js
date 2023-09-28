const Product = require("./../Models/productsModels");
const ApiFeatures = require("./../Utils/ApiFeatures");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");
const Category = require("../Models/categoriesModel");
const Counter = require("../Models/counterModel");
const Image = require("../Models/imagesModel");
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  features.model = Product;
  const { query, countPromise } = features.paginate();

  let product = await query;

  const count = await countPromise;

  product = await setCategoriesNameInProduct(product);
  res.status(200).json({
    status: "success",
    length: product.length,
    totalLength: count,
    total: 0,
    data: {
      product,
    },
  });
});

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  try {
    const { path } = req.file;
    const counter = await Counter.findOneAndUpdate(
      { _id: "productImageId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const imageId = counter.seq * 1;
    req.body.imageId = imageId;
    // Create the image
    await Image.create({
      imageId,
      name: req.body.name,
      imageUrl: path,
    });

    // Create the product
    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
exports.getProductById = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id * 1;
  let product = await Product.findOne({ productId: id });
  if (!product) {
    res.status(404).json({
      status: "fail",
      massage: `Product with that ID : ${id} is not found!`,
    });
    const error = new CustomError("Product with that ID is not found!", 404);
    return next(error);
  }
  product = await setCategoryNameInProduct(product);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateProduct = await Product.findOneAndUpdate(
      { productId: id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateProduct) {
      const error = new CustomError("Product with that ID is not found!", 404);
      return next(error);
    }
    res.status(200).json({
      status: "success",
      data: {
        product: updateProduct,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    id = req.params.id;
    const deleteProduct = await Product.findOneAndDelete(
      { productId: id },
      req.body
    );
    if (!deleteProduct) {
      const error = new CustomError("Product with that ID is not found!", 404);
      return next(error);
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
async function setCategoriesNameInProduct(products) {
  const length = products.length;
  for (let x = 0; x < length; x++) {
    if (products[x].category) {
      await Category.find({ categoryId: products[x].category * 1 })
        .then((category) => {
          products[x].category = category[0].name;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return products;
}
async function setCategoryNameInProduct(products) {
  await Category.find({ categoryId: products.category * 1 })
    .then((category) => {
      products.category = category[0].name;
    })
    .catch((err) => {
      console.log(err);
    });
  return products;
}
async function getProductsCount(features) {
  try {
    const count = await features.query.schema.methods.getCount();
    return count * 1;
  } catch (err) {
    console.log(err);
    return err;
  }
}

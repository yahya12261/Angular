const Category = require("./../Models/categoriesModel");
const ApiFeatures = require("./../Utils/ApiFeatures");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");

exports.getAllcategories = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  let category = await features.query;
  res.status(200).json({
    status: "success",
    length: category.length,
    data: {
      category,
    },
  });
});

exports.createCategory = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});
exports.updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateCategory = await Category.findOneAndUpdate(
      { categoryId: id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateCategory) {
      const error = new CustomError("Category with that ID is not found!", 404);
      return next(error);
    }
    res.status(200).json({
      status: "success",
      data: {
        category: updateCategory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    id = req.params.id;
    const deleteCategory = await Category.findOneAndDelete(
      { categoryId: id },
      req.body
    );
    if (!deleteCategory) {
      const error = new CustomError("Category with that ID is not found!", 404);
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
exports.getCategoryFromId = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findOne({ categoryId: id });

  res.status(201).json({
    status: "success",
    name: category.name,
    data: {
      category,
    },
  });
});

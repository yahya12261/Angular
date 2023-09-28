const mongoose = require("mongoose");
const fs = require("fs");
const Counter = require("./counterModel");
const Cagtegory = require("./categoriesModel");
const priceSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: [true, "Value is required field!"],
  },
  currency: {
    type: String,
    required: [true, "Currency is required field!"],
  },
});

const invetorySchema = new mongoose.Schema({
  qty: {
    type: Number,
    required: [true, "Quantity is required field!"],
  },
  available: {
    type: Boolean,
  },
});

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required field!"],
    unique: true,
    maxlength: [40, "Movie name must not have more than 40 characters"],
    minlength: [3, "Movie name must have at least 3 charachters"],
    trim: true,
  },
  imageId: {
    type: Number,
    required: [true, "image is required field!"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required field!"],
    maxlength: [40, "Brand name must not have more than 40 characters"],
    minlength: [3, "Brand name must have at least 3 charachters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required field!"],
    trim: true,
  },
  price: {
    type: priceSchema,
    required: [true, "Price is required field!"],
  },
  inventory: {
    type: invetorySchema,
    required: [true, "Inventory is required field!"],
  },
  views: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  createdBy: String,
  totalCount: Number,
  createdAt: Date,
  visible: {
    type: Number,
    default: 1,
  },
});

productSchema.pre("save", function (next) {
  const doc = this;
  Counter.findOneAndUpdate(
    { _id: "productId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      this.productId = counter.seq * 1;
      this.createdBy = "User";
      next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});
productSchema.pre("save", function (next) {
  const doc = this;
  Cagtegory.findOne({ name: doc.category })
    .then((category) => {
      this.category = category.categoryId;
      next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});

productSchema.post("save", function (doc, next) {
  const content = `A new Product document with name ${doc.name} has been created by ${doc.createdBy}\n`;
  fs.writeFileSync("./Log/log.txt", content, { flag: "a" }, (err) => {
    console.log(err.message);
  });
  next();
});

productSchema.methods.getCount = function () {
  return mongoose.model("Product").countDocuments().exec();
};

const product = mongoose.model("Product", productSchema);

module.exports = product;

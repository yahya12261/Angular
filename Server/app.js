const express = require("express");
const morgan = require("morgan");
const productsRouter = require("./Routes/productsRoutes");
const categoriesRoutes = require("./Routes/categoriesRoutes");
const bodyParser = require("body-parser");
const imageRoute = require("./Routes/imagesRoutes");
const authRoutes = require("./Routes/authRoutes");
var cors = require("cors");
let app = express();

app.use(express.json());

app.use(cors());

app.options("*", cors());

const corsOptions = {
    origin: "http://localhost:4200",
  origin: "http://localhost:4201",
    origin: "192.168.1.11",
};

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/products", productsRouter);

app.use("/api/v1/categories", categoriesRoutes);

app.use("/api/v1/image", imageRoute);

app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on the server!`,
  });
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.status = "fail";
  err.statusCode = 404;
  // const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

module.exports = app;

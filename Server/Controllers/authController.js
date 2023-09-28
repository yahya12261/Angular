const ApiFeatures = require("./../Utils/ApiFeatures");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");
const User = require("../Models/usersModel");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = asyncErrorHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, 8);

    userObject = {
      username: username,
      password: password,
    };
    const user = await User.create(userObject);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

exports.signin = asyncErrorHandler(async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    let user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, "kazabalnca", {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err });
    console.log(err);
  }
});

//   User.findOne({
//     username: req.body.username,
//   })
//     .populate("-__v")
//     .exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }

//       const token = jwt.sign({ id: user.id }, "kazabalnca", {
//         algorithm: "HS256",
//         allowInsecureKeySizes: true,
//         expiresIn: 86400, // 24 hours
//       });

//       res.status(200).send({
//         id: user._id,
//         username: user.username,
//         accessToken: token,
//       });
//     });
// };

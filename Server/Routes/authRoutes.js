const verifySignUp = require("../Middleware/verifySginUp");
const express = require("express");
const authConroller = require("../Controllers/authController");
const router = express.Router();

router.route("/sginup").post(authConroller.signup);

router.route("/sginin").post(authConroller.signin);

module.exports = router;

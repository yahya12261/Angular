const mongoose = require("mongoose");
const fs = require("fs");
const Counter = require("./counterModel");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "name is required field!"],
  },
  password: {
    type: String,
    required: [true, "password is required field!"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;

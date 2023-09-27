const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    _id: { type: objectId, auto: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, maxlength: 255, required: true },
  },
  {
    versionKey: false,
  }
);


module.exports = mongoose.model("User", userSchema);

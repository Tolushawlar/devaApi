const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  balance: Number,
});

module.exports = mongoose.model("Wallet", walletSchema);

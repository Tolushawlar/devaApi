const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const walletSchema = new mongoose.Schema({
  _id: { type: objectId, auto: true },
  userId: mongoose.Schema.Types.ObjectId,
  balance: Number,
});

module.exports = mongoose.model("Wallet", walletSchema);

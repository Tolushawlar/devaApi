const transcationsModel = require("../models/transcations.model");
const TransactionModel = require("../models/transcations.model");
const UserModel = require("../models/user.model");
const WalletModels = require("../models/wallet.model");
const express = require("express");
const jwt = require("jsonwebtoken");

exports.createTransaction = async (req, res) => {
  try {
    const { senderId, receiverId, senderBalance, recieverBalance, amount } =
      req.body;

    const senderWallet = await WalletModels.findOne({ userId: senderId });
    const receiverWallet = await WalletModels.findOne({ userId: receiverId });
    console.log(senderWallet);
    // console.log(receiverId);
    if (!senderWallet) {
      return res.status(404).json({ message: "Sender wallet not found" });
    }
    if (!receiverWallet) {
      return res.status(404)({ message: "Reciever wallet not found" });
    }
    if (senderWallet.balance < amount) {
      return res.status(404).json({ message: "Insuffiecent funds" });
    } else {
      senderWallet.balance -= amount;
      await senderWallet.save();
      receiverWallet.balance += amount;
      await receiverWallet.save();

      TransactionModel.senderId = senderId;
      TransactionModel.receiverId = receiverId;
      TransactionModel.amount = amount;
      await transcationsModel.save();
      res.status(201).json({ message: "Transaction successful" });
    }
  } catch (error) {
    console.error("Error processing transcation");
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const trasactions = await TransactionModel.find({});
    res.send({ trasactions });
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const TransactionModel = require("../models/transcations.model");
const UserModel = require("../models/user.model");
const WalletModels = require("../models/wallet.model");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const systemId = "65141955d6ecdf66a6666af6";

exports.createTransaction = async (req, res) => {
  try {
    const { senderId, receiverId, senderBalance, recieverBalance, amount } =
      req.body;
    const senderWallet = await WalletModels.findOne({ userId: senderId });
    const receiverWallet = await WalletModels.findOne({ userId: receiverId });
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

      const newTransaction = new TransactionModel({
        senderId: senderId,
        receiverId: receiverId,
        amount: amount,
        description: "TransferCoins",
      });
      await newTransaction.save();
      res.status(201).json({ message: "Transaction successful" });
    }
  } catch (error) {
    console.error("Error processing transcation");
    res.status(500).json({ message: "Internal server error" });
  }
};

// add 100 value to the balance of a user wallet
exports.addCoin = async (req, res) => {
  try {
    const walletId = req.params.walletId;
    const userWallet = await WalletModels.findOne({ _id: walletId });
    if (!userWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    if (userWallet) {
      userWallet.balance += 100;
      await userWallet.save();
      res.send(userWallet);

      const newTransaction = new TransactionModel({
        senderId: systemId,
        receiverId: walletId,
        amount: 100,
        description: "BuyCoins",
      });
      await newTransaction.save();
    }
  } catch (error) {
    console.error("Error processing transcation", error);
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

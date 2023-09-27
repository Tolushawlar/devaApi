const WalletModel = require("../models/wallet.model");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

exports.getWallet = async (req, res) => {
  try {
    const wallets = await WalletModel.find({});
    res.send({ wallets });
  } catch (error) {
    console.error("Error fetching wallets");
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createWallet = async (req, res) => {
  try {
    // Get the user ID from authentication (you need to implement this)
    const userId = req.params.userId;
    console.log(userId);
    // Check if the user already has a wallet
    const existingWallet = await WalletModel.findOne({ userId });

    if (existingWallet) {
      return res.status(400).json({ message: "User already has a wallet." });
    }

    // Create a new wallet for the user
    const wallet = new WalletModel({ userId, balance: 0 });
    await wallet.save();

    return res
      .status(201)
      .json({ message: "Wallet created successfully", wallet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

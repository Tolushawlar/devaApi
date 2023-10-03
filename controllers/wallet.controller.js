const WalletModel = require("../models/wallet.model");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

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
    const userId = req.params.userId;
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

exports.getWalletDetails = async (req, res) => {
  try {
    const walletId = req.params.walletId;
    const walletInfo = await WalletModel.findOne({ _id: walletId });
    if (!walletInfo) {
      return res.status(400).json({ message: "Wallet not found" });
    }
    res.status(200).json(walletInfo);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateWallet = async (req, res) => {
  try {
    const walletId = req.params.walletId;
    const { balance } = req.body;
    const walletInfo = await WalletModel.findOne({ _id: walletId });
    if (!walletInfo) {
      return res.status(400).json({ message: "Wallet not found" });
    }
    if (balance) {
      walletInfo.balance = balance;
    }
    await walletInfo.save();
    res.status(200).json(walletInfo);
  } catch (error) {
    console.error("Error updating wallet details", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteWallet = async (req, res) => {
  try {
    const walletId = req.params.walletId;
    const walletInfo = await WalletModel.findOne({ _id: walletId });
    if (!walletInfo) {
      return res.status(400).json({ message: "wallet not found" });
    }
    await walletInfo.deleteOne({ _id: walletId });
    res.status(200).json({ message: "wallet deleted" });
  } catch (error) {
    console.error("Error deleting wallet", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

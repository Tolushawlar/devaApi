const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

router.get("/api/wallet", walletController.getWallet);
router.post("/api/wallet/create/:userId", walletController.createWallet);

module.exports = router;

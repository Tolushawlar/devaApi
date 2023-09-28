const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

router.get("/api/wallet", walletController.getWallet);
router.post("/api/wallet/create/:userId", walletController.createWallet);
router.get("/api/wallet/:walletId", walletController.getWalletDetails);
router.put("/api/wallet/:walletId", walletController.updateWallet);
router.delete("/api/wallet/:walletId", walletController.deleteWallet);

module.exports = router;
